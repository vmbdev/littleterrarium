import { Router } from 'express';
import Specie from '../controllers/specie.js';

const router = Router();

router.get('/find', Specie.find);
router.post('/create', Specie.create);
router.post('/modify', Specie.modify);
router.delete('/remove', Specie.remove);

export default router;