import prisma from '../prismainstance.js';
import { Light } from '@prisma/client';

const create = async (req, res, next) => {
  const userId = req.body.userId ? req.body.userId : req.session.userId;
  const data = { ownerId: userId };
  const requiredFields = ['name', 'light'];

  for (const field of requiredFields) {
    if (!req.body[field]) return next({ error: 'MISSING_FIELD', code: 400, field });
    else if ((field === 'light') && !Light.hasOwnProperty(req.body[field])) {
      return next({ error: 'INCORRECT_FIELD', code: 400, field, values: Object.values(Light) });
    }

    data[field] = req.body[field];
  }

  if (req.file) data['picture'] = req.file.path;

  prisma.location.create({ data })
    .then(() => res.send({ msg: 'LOCATION_CREATED' }))
    .catch(() => next({ error: 'LOCATION_CREATE_ERROR', code: 400 }));
}

const find = (req, res, next) => {

}

const modify = (req, res, next) => {

}

const remove = (req, res, next) => {
  const userId = req.body.userId ? req.body.userId : req.session.userId;
  const { id } = req.body;

  prisma.location.delete({ where: { id, ownerId: userId } })
    .then(() => res.send({ msg: 'LOCATION_REMOVED' }))
    .catch(() => next({ error: 'LOCATION_NOT_VALID', code: 400 }));
}

export default { find, create, modify, remove };