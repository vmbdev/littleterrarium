import { Router } from 'express';
import Plant from '../controllers/plant.js';

const router = Router();

router.get('/find', Plant.find);
router.post('/create', Plant.create);
router.post('/modify', Plant.modify);
router.delete('/remove', Plant.remove);

export default router;