import { Router } from 'express';
import auth from '../middlewares/auth.js';
import parser from '../middlewares/parser.js';
import plant from '../controllers/plant.js';

const router = Router();

router.post('/', 
  auth.self,
  parser.integers({
    locationId: true,
    specieId: false,
    waterFreq: false,
    fertFreq: false,
    potType: false,
  }),
  plant.create
);
router.get('/', auth.self, plant.find);
router.get('/location/:locationId', auth.self, parser.integers({ locationId: true }), plant.find);
router.get('/:id?', auth.self, parser.integers({ id: false }), plant.findOne);
router.put('/',
  auth.self,
  parser.integers({
    id: true,
    locationId: false,
    specieId: false,
    waterFreq: false,
    fertFreq: false,
    potType: false,
  }),
  auth.check('location', 'locationId'),
  plant.modify
);
router.delete('/:id', auth.self, parser.integers({ id: true }), plant.remove);

export default router;