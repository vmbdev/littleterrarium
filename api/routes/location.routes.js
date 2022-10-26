import { Router } from 'express';
import location from '../controllers/location.controller.js';
import multerUploader from '../middlewares/uploader.js';
import auth from '../middlewares/auth.js';
import disk from '../middlewares/disk.js';
import parser from '../middlewares/parser.js';

const router = Router();
const uploader = multerUploader();

router.post('/', auth.self, uploader.single('picture'), disk.image, location.create);
router.get('/', auth.self, location.find);
router.get('/user/:userId', auth.self, parser.integers({ userId: true }), location.find);
router.get('/:id', auth.self, parser.integers({ id: true }), location.findOne);
router.put('/',
  auth.self,
  uploader.single('picture'),
  auth.checkOwnership('location'),
  parser.integers({ id: true }),
  disk.image,
  location.modify
);
router.delete('/:id', auth.self, parser.integers({ id: true }), location.remove);

export default router;