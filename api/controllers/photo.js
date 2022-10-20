import prisma from "../prismainstance.js";
import filesystem from '../helpers/filesystem.js';

const create = (req, res, next) => {
  if (req.disk.files.length === 0) return next({ error: 'PHOTO_NOT_FOUND' });

  const data = {};
  const optionalFields = ['description', 'public'];

  data.ownerId = req.auth.userId;
  data.plantId = req.parser.plantId;

  for (const field of optionalFields) {
    if (req.body[field]) {
      if (field === 'public') {
        data.public = ((req.body.public === true) || (req.body.public === 'true'));
      }
      else data[field] = req.data[field];
    }
  }

  const ops = req.disk.files.map((file) => {
    const currentData = { ...data };
    currentData.images = file.url;

    // on both update or insert, we always create the picture
    return prisma.hash.upsert({
      where: { hash: file.hash },
      update: {
        references: { increment: 1 },
        photos: { create: currentData }
      },
      create: {
        hash: file.hash,
        photos: { create: currentData }
      }
    });
  });

  prisma.$transaction(ops);
  res.send({ msg: 'PHOTOS_CREATED' });
}

const find = async (req, res, next) => {
  const conditions = {};

  if (req.parser.plantId) conditions.plantId = req.parser.plantId;
  conditions.ownerId = req.auth.userId;

  const photos = await prisma.photo.findMany({
    where: conditions,
    select: {
      id: true,
      image: true,
      description: true,
      public: true,
      takenAt: true
    }
  });

  if (photos.length > 0) res.send(photos);
  else next({ error: 'PHOTO_NOT_FOUND' });
}

const findOne = async (req, res, next) => {
  try {
    const photo = await prisma.photo.findUniqueOrThrow({
      where: {
        id: req.parser.id,
        ownerId: req.auth.userId
      },
      select: {
        id: true,
        images: true,
        description: true,
        public: true,
        takenAt: true
      }
    });
    res.send(photo);
  } catch (err) {
    next({ error: 'PHOTO_NOT_FOUND' });
  }
}

// let's be conservative here:
// user can only update the description and the takenAt date, not the picture
const modify = async (req, res, next) => {
  const data = {};
  const fields = ['description', 'takenAt', 'public'];

  for (const field of fields) {
    if (field === 'takenAt') data.takenAt = new Date(req.body.takenAt);
    else if (field === 'public') {
      data.public = ((req.body.public === true) || (req.body.public === 'true'));
    }
    else data[field] = req.body[field];
  }

  try {
    await prisma.photo.update({
      where: {
        id: req.parser.id,
        ownerId: req.auth.userId
      },
      data,
    });
    res.send({ msg: 'PHOTO_UPDATED' });
  } catch (err) {
    next({ error: 'PHOTO_NOT_FOUND' });
  }
}

const remove = async (req, res, next) => {
  try {
    const { hashId, image } = await prisma.photo.delete({
      where: {
        id: req.parser.id,
        ownerId: req.auth.userId
      }
    });

    // no need to check for ownerId as we checked above
    // yeah, we update and sometimes we delete
    // it's still possibly less operations than check and update/check and delete
    const { references } = await prisma.hash.update({
      where: { id: hashId },
      data: { references: { decrement: 1 } }
    });

    if (references === 0) {
      await prisma.hash.delete({ where: { id: hashId } });
      await filesystem.removeFile(image);
    }

    res.send({ msg: 'PHOTO_REMOVED' });
  } catch (err) {
    next({ error: 'PHOTO_NOT_FOUND' });
  }
}

export default {
  create,
  find,
  findOne,
  modify,
  remove
};