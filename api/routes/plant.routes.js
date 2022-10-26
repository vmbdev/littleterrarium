import { Router } from 'express';
import auth from '../middlewares/auth.js';
import parser from '../middlewares/parser.js';
import plant from '../controllers/plant.controller.js';

const router = Router();

router.post('/', 
  auth.self,
  parser.integers({
    locationId: true,
    specieId: false,
    waterFreq: false,
    fertFreq: false,
    potSize: false,
  }),
  auth.checkRelationship('location', 'locationId'),
  plant.create
);
router.get('/', auth.self, plant.find);
// FIXME: this can be managed better
router.get('/user/:userId', auth.self, parser.integers({ userId: true }), plant.find);
router.get('/user/:userId/location/:locationId', auth.self, parser.integers({ userId: true, locationId: true }), plant.find);
router.get('/location/:locationId', auth.self, parser.integers({ locationId: true }), plant.find);
router.get('/:id?', auth.self, parser.integers({ id: false }), plant.findOne);
router.put('/',
  auth.self,
  auth.checkOwnership('plant'),
  auth.checkRelationship('location', 'locationId'),
  parser.integers({
    id: true,
    locationId: false,
    specieId: false,
    waterFreq: false,
    fertFreq: false,
    potSize: false,
  }),
  plant.modify
);
router.delete('/:id', auth.self, parser.integers({ id: true }), plant.remove);

export default router;