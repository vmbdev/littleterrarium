import { Router } from 'express';
import photo from '../controllers/photo.js';
import multerUploader from '../middlewares/uploader.js';
import auth from '../middlewares/auth.js';
import disk from '../middlewares/disk.js';
import parser from '../middlewares/parser.js';

const router = Router();
const uploader = multerUploader();

router.post('/',
  auth.self,
  uploader.array('photo', 10),
  parser.integers({ plantId: true }),
  auth.check('plant', 'plantId'),
  disk.gallery,
  photo.create
);
router.get('/', auth.self, photo.find);
router.get('/plant/:plantId',
  auth.self,
  parser.integers({ plantId: true }),
  auth.check('plant', 'plantId'),
  photo.find
);
router.get('/:id', auth.self, parser.integers({ id: true }), photo.findOne);
router.put('/', auth.self, auth.check('plant', 'plantId'), uploader.array('photos'), disk.image, photo.modify);
router.delete('/:id', auth.self, parser.integers({ id: true }), photo.remove);

export default router;