import prisma from '../prismainstance.js';
import { Light } from '@prisma/client';
import FileSystem from '../helpers/filesystem.js';

const find = (req, res) => {

}

const create = async (req, res) => {
  const userId = req.body.userId ? req.body.userId : req.session.userId;
  const data = { ownerId: userId };
  const requiredFields = ['name', 'light'];

  for (const field of requiredFields) {
    if (!req.body[field]) return res.status(400).send({ error: 'MISSING_FIELD', field});
    else if ((field === 'light') && !Light.hasOwnProperty(req.body[field])) {
      return res.status(400).send({ error: 'INCORRECT_FIELD', field, values: Object.values(Light) });
    }

    data[field] = req.body[field];
  }
  if (req.file) {
    try {
      const publicFilePath = await FileSystem.saveFile(req.file.path);
      data['picture'] = publicFilePath;
    } catch (e) {
      if ((e.error) && (e.error === 'IMG_NOT_VALID')) return res.status(400).send({ error: e.error });
      else return res.status(500).send({ error: 'SERVER_ERROR' });
    }
  } 

  prisma.location.create({ data })
  .then(() => { res.send({ msg: 'LOCATION_CREATED' }) })
  .catch((err) => { res.status(400).send({ error: 'LOCATION_CREATE_ERROR', err })});
}

const modify = (req, res) => {

}

const remove = (req, res) => {
  const userId = req.body.userId ? req.body.userId : req.session.userId;

  const { id } = req.body;

  prisma.location.delete({ where: { id, ownerId: userId } })
  .then(() => res.send({ msg: 'LOCATION_REMOVED' }))
  .catch(() => { res.status(400).send({ error: 'LOCATION_NOT_VALID ' })})
}

export default { find, create, modify, remove };