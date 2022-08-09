import prisma from "../prismainstance.js";
import filesystem from '../helpers/filesystem.js';

const create = (req, res, next) => {
  if (req.disk.files.length === 0) return next({ error: 'PHOTO_NOT_FOUND' });

  const data = {};
  const optionalFields = ['description', 'public'];

  data.ownerId = req.auth.userId;
  data.plantId = req.body.plantId;

  for (const field of optionalFields) {
    if (req.body[field]) {
      if (field === 'public') data.public = (req.body.public === 'true');
      else data[field] = req.data[field];
    }
  }

  const ops = req.disk.files.map((file) => {
    const currentData = { ...data };
    currentData.image = file.path;

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

  if (req.params.plantId) conditions.plantId = req.params.plantId;
  conditions.ownerId = req.auth.userId;

  const photos = await prisma.photo.findMany({ where: conditions });

  if (photos.length > 0) res.send(photos);
  else next({ error: 'PHOTO_NOT_FOUND' });
}

const findOne = async (req, res, next) => {
  try {
    const photo = await prisma.photo.findUniqueOrThrow({
      where: { 
        id_ownerId: {
          id: req.params.id,
          ownerId: req.auth.userId
        }
      }
    });
    res.send(photo);
  } catch (err) {
    next({ error: 'PHOTO_NOT_FOUND' });
  }
}

const modify = async (req, res, next) => {
  const fields = [''];
}

const remove = async (req, res, next) => {
  try {
    const { hashId, image } = await prisma.photo.delete({
      where: {
        id_ownerId: {
          id: req.params.id,
          ownerId: req.auth.userId
        }
      }
    });

    // no need to check for ownerId as we checked above
    // yeah, we update and sometimes we delete
    // it's still possibly less operations than check and update/check and delete
    const { references } = await prisma.hash.update({ where: { id: hashId }, data: { references: { decrement: 1 } } });

    if (references === 0) {
      await prisma.hash.delete({ where: { id: hashId } });
      await filesystem.removeFile(image);
    }

    res.send({ msg: 'PLANT_REMOVED' });
  } catch(err) {
    next({ error: 'PLANT_NOT_FOUND' });
  }
}

export default {
  create,
  find,
  findOne,
  modify,
  remove
};