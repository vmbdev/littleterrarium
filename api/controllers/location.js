import { Light } from '@prisma/client';
import prisma from '../prismainstance.js';

// FIXME: if several users upload the same picture and one deletes it, there's no way to know if it's the last copy

const create = async (req, res, next) => {
  const data = {};
  const requiredFields = ['name', 'light'];
  
  // public is not really optional, but it has a default value
  // we don't include 'picture' as it's managed through req.disk
  const optionalFields = ['public'];

  // check through the mandatory fields
  for (const field of requiredFields) {
    if (!req.body[field]) return next({ error: 'MISSING_FIELD', field });
    else if ((field === 'light') && !Light.hasOwnProperty(req.body[field])) {
      return next({ error: 'INCORRECT_FIELD', field, values: Object.values(Light) });
    }

    data[field] = req.body[field];
  }

  // check through the optinal fields and add them if they're present
  for (const field of optionalFields) {
    if (req.body[field]) {
      if (field === 'public') data.public = (req.body.public === 'true');
      else data[field] = req.body[field];
    }
  }

  // if picture
  if (req.disk) data['picture'] = req.disk.file.url;

  data.ownerId = req.auth.userId;
  try {
    await prisma.location.create({ data });
    res.send({ msg: 'LOCATION_CREATED' });
  } catch (err) {
    next({ code: 500 });
  }
}

const find = async (req, res, next) => {
  const query = {
    where: { ownerId: req.auth.userId },
    select: { id: true, name: true, picture: true }
  }

  if (req.query.plants) {
    const limit = req.query.limit ? Number.parseInt(req.query.limit) : undefined;
    query.select.plants = {
      take: limit > 0? limit : undefined,
      select: {
        id: true,
        specieId: true,
        customName: true,
        photos: {
          take: 1,
          select: { image: true }
        }
      }
    };
  }

  const locations = await prisma.location.findMany(query);
  res.send(locations);
}

const findOne = async (req, res, next) => {
  const query = {
    where: { id: req.parser.id, ownerId: req.auth.userId },
    select: { id: true, name: true, picture: true, light: true, public: true }
   };

  if (req.query.plants) {
    const limit = req.query.limit ? Number.parseInt(req.query.limit) : undefined;
    query.select.plants = {
      take: limit > 0 ? limit : undefined,
      select: {
        id: true,
        specieId: true,
        customName: true,
        photos: {
          take: 1,
          select: { image: true }
        }
      }
    };
  }

  const location = await prisma.location.findFirst(query);

  if (location) res.send(location);
  else next({ error: 'LOCATION_NOT_FOUND', code: 404 });
}

const modify = async (req, res, next) => {
  const fields = ['name', 'picture', 'light', 'public'];
  const data = {};

  for (const requestedField of Object.keys(req.body)) {
    if (fields.includes(requestedField)) {
      if (requestedField === 'public') data.public = (req.body.public === 'true');
      else data[requestedField] = req.body[requestedField];
    }
  }

  // req.auth.userId is authorised by auth middleware
  const { count } = await prisma.location.updateMany({
    where: {
      id: req.parser.id,
      ownerId: req.auth.userId
    },
    data
  });
  if (count === 1) res.send({ msg: 'LOCATION_UPDATED' });
  else next({ error: 'LOCATION_NOT_VALID' });
}

const remove = async (req, res, next) => {
  const { count } = await prisma.location.deleteMany({ where: { id, ownerId: req.auth.userId } });
  if (count === 1) res.send({ msg: 'LOCATION_REMOVED' });
  else next({ error: 'LOCATION_NOT_VALID' });
}

export default {
  create,
  find,
  findOne,
  modify,
  remove
};