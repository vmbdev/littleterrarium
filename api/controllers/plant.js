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

  // if (!req.body.specieId && !req.body.customName) return next({ error: 'PLANT_SPECIE_OR_NAME' });

  for (const field of requiredFields) {
    if (!req.body[field]) return next({ error: 'MISSING_FIELD', data: { field } });
    else if (field === 'locationId') data.locationId = req.parser.locationId;
    else data[field] = req.body[field];
  }

  for (const field of optionalFields) {
    if (req.body[field]) {
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
          data[field] = req.parser[field];
          break;
        }
        case 'waterLast':
        case 'fertLast': {
          const date = new Date(req.body[field]);
          data[field] = date;
          break;
        }
        case 'public': {
          data.public = ((req.body.public === true) || (req.body.public === 'true'));
          break;
        }
        default:
          data[field] = req.body[field];
      }
    }
  }

  data.ownerId = req.auth.userId;
  try {
    const newPlant = await prisma.plant.create({ data });
    res.send({ msg: 'PLANT_CREATED', plant: newPlant });
  } catch (err) {
    next({ code: 500 });
  }

}

const find = async (req, res, next) => {
  const conditions = {};

  if (req.parser.locationId) conditions.locationId = req.parser.locationId;
  conditions.ownerId = req.auth.userId;

  const plants = await prisma.plant.findMany({
    where: conditions,
    select: {
      id: true,
      customName: true,
      photos: {
        take: 1,
        select: {
          id: true,
          images: true,
          public: true,
          takenAt: true
        }
      },
      specie: {
        select: {
          name: true,
          commonName: true
        }
      }
    }
  });
  res.send(plants);
}

const findOne = async (req, res, next) => {
  const conditions = {};

  if (req.parser.id) conditions.id = req.parser.id;
  conditions.ownerId = req.auth.userId;

  const plant = await prisma.plant.findFirst({
    where: conditions,
    include: {
      photos: {
        select: {
          id: true,
          images: true,
          description: true,
          public: true,
          takenAt: true
        },
        orderBy: { takenAt: 'asc' }
      },
      specie: {
        select: {
          name: true,
          commonName: true
        }
      }
    }
  });
  if (plant) res.send(plant);
  else next({ error: 'PLANT_NOT_VALID' });
}

const modify = async (req, res, next) => {
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
          data[field] = req.parser[field];
          break;
        }
        case 'waterLast':
        case 'fertLast': {
          const date = new Date(req.body[field]);
          data[field] = date;
          break;
        }
        case 'public': {
          data.public = ((req.body.public === true) || (req.body.public === 'true'));
          break;
        }
        default:
          data[field] = req.body[field];
      }
    }
  }

  const { count } = await prisma.plant.updateMany({ where: { id: req.parser.id, ownerId: req.auth.userId }, data });
  if (count === 1) res.send({ msg: 'PLANT_UPDATED' })
  else next({ error: 'PLANT_NOT_VALID' });
}

const remove = async (req, res, next) => {
  const { count } = await prisma.plant.deleteMany({ where: { id: req.parser.id, ownerId: req.auth.userId } });
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