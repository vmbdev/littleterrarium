import { Condition } from "@prisma/client"
import prisma from "../prismainstance.js";
import dayjs from "dayjs";

/**
 * Express Middleware that creates a Plant object in the database.
 * Even though we receive a Plant-like object, we specify which properties are allowed to be stored
 * and check each of them for security sake.
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
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

  if (req.body.waterFreq && req.body.waterLast && dayjs(dayjs(req.body.waterFreq).isValid() && +req.body.waterLast)) {
    data.waterNext = dayjs(req.body.waterLast).add(req.body.waterFreq, 'days').toDate();
  }

  data.ownerId = req.auth.userId;

  try {
    const plant = await prisma.plant.create({ data });

    res.send({ msg: 'PLANT_CREATED', plant: plant });
  } catch (err) {
    next({ code: 500 });
  }
}

/**
 * Express Middleware to request a list of Plant objects optionally filtered by locationId.
 * The object contains one Photo object as well as the Specie object related to it.
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
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

/**
 * Express Middleware to request a Plant object by id.
 * The object contains all of the Photo objects linked to the plant, as well as its Specie object.
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
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

/**
 * Express Middleware to update an existing Plant object by id.
 * Like when creating, we manually introduce the fields in the final object.
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
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

  try {
    let plant = await prisma.plant.update({
      where: {
        id: req.parser.id,
        ownerId: req.auth.userId
      },
      data
    });


    /**
     * Check if the object has both frequency and last time for both water and
     * fertlizer. If so, updates the waterNext/waterFreq property.
     * This is tricky, as it requires an update from the object that has been
     * just updated, but it's needed as only one property may have been updated
     * and thus received by the user (i.e. waterFreq but no waterLast).
     * In an environment with a specied database that supports both triggers
     * and date operations, it can be done with such trigger.
     * */
    const updatedPlant = {};

    if (plant.waterFreq && plant.waterLast) {
      updatedPlant.waterNext = dayjs(plant.waterLast).add(plant.waterFreq, 'days').toDate();
    }

    if (plant.fertFreq && plant.fertLast) {
      updatedPlant.fertNext = dayjs(plant.fertLast).add(plant.fertFreq, 'days').toDate();
    }

    if (Object.keys(updatedPlant).length > 0) {
      plant = await prisma.plant.update({
        where: {
          id: req.parser.id,
          ownerId: req.auth.userId
        },
        data: updatedPlant
      });
    }

    res.send({ msg: 'PLANT_UPDATED', plant });
  } catch (err) {
    console.log(err);
    next({ error: 'PLANT_NOT_VALID' });
  }
}

/**
 * Remove a Plant object by its id.
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
const remove = async (req, res, next) => {
  const plant = await prisma.plant.delete({ where: { id: req.parser.id, ownerId: req.auth.userId } });

  if (plant) res.send({ msg: 'PLANT_REMOVED' });
  else next({ error: 'PLANT_NOT_VALID' });
}

export default {
  create,
  find,
  findOne,
  modify,
  remove
};