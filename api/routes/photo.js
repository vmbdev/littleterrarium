import { Router } from 'express';
import Photo from '../controllers/photo.js';

const router = Router();

router.get('/find', Photo.find);
router.post('/create', Photo.create);
router.post('/modify', Photo.modify);
router.delete('/remove', Photo.remove);

export default router;