import { Router } from 'express';
import auth from '../middlewares/auth.js';
import Location from '../controllers/location.js';
import Uploader from '../middlewares/uploader.js';

const router = Router();
const uploader = Uploader();

router.get('/:id', auth, Location.find);
router.post('/', auth, uploader.single('picture'), Location.create);
router.put('/', auth, uploader.single('picture'), Location.modify);
router.delete('/:id', auth, Location.remove);

export default router;