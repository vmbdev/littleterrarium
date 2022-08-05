import { Condition } from "@prisma/client"
import prisma from "../prismainstance.js";

const create = async (req, res, next) => {
  const requiredFields = ['locationId'];
  const optionalFields = [
    'specieId',
    'customName',
    'description',
    'condition',
    'waterFreq',
    'waterLast',
    'fertFreq',
    'fertLast',
    'fertType',
    'potType',
    'potSize',
    'soil',
    'public'
  ];
  const data = {};

  if (!req.body.specieId && !req.body.customName) return next({ error: 'PLANT_SPECIE_OR_NAME' });

  for (const field of requiredFields) {
    if (!req.body[field]) return next({ error: 'MISSING_FIELD', data: { field } });
    else if (field === 'locationId') {
      data.locationId = Number.parseInt(req.body.locationId);

      if (!data.locationId) return next({ error: 'PLANT_LOCATION_ERROR' });
    }
    else data[field] = req.body[field];
  }

  for (const field of optionalFields) {
    switch (field) {
      case 'condition': {
        if (!Condition.hasOwnProperty(req.body.condition)) return next({ error: 'PLANT_CONDITION' });
        else data.condition = Condition[req.body.condition];
        break;
      }
      case 'specieId':
      case 'waterFreq':
      case 'fertFreq':
      case 'potSize': {
        const numericValue = Number.parseInt(req.body[field]);
        data[field] = numericValue;
        break;
      }
      case 'waterLast':
      case 'fertLast': {
        const date = new Date(req.body[field]);
        data[field] = date;
        break;
      }
      case 'public': {
        data.public = (req.body.public === 'true');
        break;
      }
      default:
        data[field] = req.body[field];
    }
  }

  data.ownerId = req.auth.userId;
  try {
    await prisma.plant.create({ data });
    res.send({ msg: 'PLANT_CREATED' });
  } catch (e) {
    next({ code: 500 });
  }

}

const find = async (req, res, next) => {
  const conditions = {};

  if (req.params.locationId) {
    conditions.locationId = Number.parseInt(req.params.locationId);
    if (!conditions.locationId) return next({ error: 'PLANT_LOCATION_ERROR' });
  }

  conditions.ownerId = req.auth.userId;

  const plants = await prisma.plant.findMany({ where: conditions });
  res.send(plants);
}

const findOne = async (req, res, next) => {
  const conditions = {};

  if (req.params.id) {
    conditions.id = Number.parseInt(req.params.id);
    if (!conditions.id) return next({ error: 'PLANT_NOT_VALID' });
  }

  conditions.ownerId = req.auth.userId;

  const plant = await prisma.plant.findFirst({ where: conditions });
  if (plant) res.send(plant);
  else next({ error: 'PLANT_NOT_VALID' });
}

// FIXME: check if locationId doesn't violate auth
const modify = async (req, res, next) => {
  if (!req.body.id) return next({ error: 'PLANT_ID_MISSING' });
  const id = Number.parseInt(req.body.id);
  const data = {};
  const fields = [
    'locationId',
    'specieId',
    'customName',
    'description',
    'condition',
    'waterFreq',
    'waterLast',
    'fertFreq',
    'fertLast',
    'fertType',
    'potType',
    'potSize',
    'soil',
    'public'
  ];

  for (const field of Object.keys(req.body)) {
    if (fields.includes(field)) {
      switch (field) {
        case 'condition': {
          if (!Condition.hasOwnProperty(req.body.condition)) return next({ error: 'PLANT_CONDITION' });
          else data.condition = Condition[req.body.condition];
          break;
        }
        case 'locationId':
        case 'specieId':
        case 'waterFreq':
        case 'fertFreq':
        case 'potSize': {
          const numericValue = Number.parseInt(req.body[field]);
          data[field] = numericValue;
          break;
        }
        case 'waterLast':
        case 'fertLast': {
          const date = new Date(req.body[field]);
          data[field] = date;
          break;
        }
        case 'public': {
          data.public = (req.body.public === 'true');
          break;
        }
        default:
          data[field] = req.body[field];
      }
    }
  }

  const { count } = await prisma.plant.updateMany({ where: { id, ownerId: req.auth.userId }, data });
  if (count === 1) res.send({ msg: 'PLANT_UPDATED' })
  else next({ error: 'PLANT_NOT_VALID' });
}

const remove = async (req, res, next) => {
  const id = Number.parseInt(req.params.id);
  if (!id) return next({ error: 'PLANT_NOT_VALID' });

  const { count } = await prisma.plant.deleteMany({ where: { id, ownerId: req.auth.userId } });
  if (count === 1) res.send({ msg: 'PLANT_REMOVED' });
  else next({ error: 'PLANT_NOT_VALID' });
}

export default {
  create,
  find,
  findOne,
  modify,
  remove
};