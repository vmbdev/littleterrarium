import { Router } from 'express';
import Location from '../controllers/location.js';
import Uploader from '../middlewares/uploader.js';
import Auth from '../middlewares/auth.js';
import Disk from '../middlewares/disk.js';

const router = Router();
const uploader = Uploader();

router.get('/:id', Auth.self, Location.find);
router.post('/', Auth.self, uploader.single('picture'), Disk.image, Location.create);
router.put('/', Auth.self, uploader.single('picture'), Location.modify);
router.delete('/:id', Auth.self, Location.remove);

export default router;