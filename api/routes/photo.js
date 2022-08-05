import { Router } from 'express';
import photo from '../controllers/photo.js';
import multerUploader from '../middlewares/uploader.js';
import auth from '../middlewares/auth.js';
import disk from '../middlewares/disk.js';

const router = Router();
const uploader = multerUploader();

router.post('/', auth.self, uploader.array('photos'), disk.gallery, photo.create);
router.get('/', auth.self, photo.find);
router.get('/:id', auth.self, photo.findOne);
router.put('/', auth.self, uploader.single('picture'), disk.image, photo.modify);
router.delete('/:id', auth.self, photo.remove);

export default router;