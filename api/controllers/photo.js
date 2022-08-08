import prisma from "../prismainstance.js";
import filesystem from '../helpers/filesystem.js';

const create = (req, res, next) => {
  if (req.disk.files.length === 0) return next({ error: 'PHOTO_NOT_FOUND' });
  if (!req.body.plantId) return next({ error: 'PHOTO_PLANT_MISSING' });

  const data = {};
  const optionalFields = ['description', 'public'];

  data.ownerId = req.auth.userId;
  data.plantId = Number.parseInt(req.body.plantId)

  if (!data.plantId) return next({ error: 'PHOTO_PLANT_INVALID' });

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
  conditions.ownerId = req.auth.userId;

  if (req.params.plantId) {
    conditions.plantId = Number.parseInt(req.params.plantId);

    if (!conditions.plantId) return next({ error: 'PHOTO_INVALID_PLANT' });
  }

  const photos = await prisma.photo.findMany({ where: conditions });

  if (photos.length > 0) res.send(photos);
  else next({ error: 'PHOTO_NOT_FOUND' });
}

const findOne = async (req, res, next) => {
  if (!req.params.id)return next({ error: 'PHOTO_ID_MISSING' });

  const id = Number.parseInt(req.params.id);

  if (!id) return next({ error: 'PHOTO_ID_INVALID' });

  try {
    const photo = await prisma.photo.findUniqueOrThrow({
      where: { 
        id_ownerId: {
          id,
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
  if (!req.params.id) return next({ error: 'PHOTO_ID_MISSING' });
  const id = Number.parseInt(req.params.id)

  if (!id) return next({ error: 'PHOTO_ID_INVALID' });

  try {
    const { hashId, image } = await prisma.photo.delete({
      where: {
        id_ownerId: {
          id,
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