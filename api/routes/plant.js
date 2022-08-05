import { Router } from 'express';
import auth from '../middlewares/auth.js';
import plant from '../controllers/plant.js';

const router = Router();

router.post('/', auth.self, plant.create);
router.get('/', auth.self, plant.find);
router.get('/location/:locationId', auth.self, plant.find);
router.get('/:id?', auth.self, plant.findOne);
router.put('/', auth.self, auth.check('location', 'locationId'), plant.modify);
router.delete('/:id', auth.self, plant.remove);

export default router;