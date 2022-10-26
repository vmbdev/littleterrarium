import { Router } from 'express';
import photo from '../controllers/photo.controller.js';
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
  auth.checkRelationship('plant', 'plantId'),
  disk.gallery,
  photo.create
);
router.get('/', auth.self, photo.find);
router.get('/plant/:plantId',
  auth.self,
  parser.integers({ plantId: true }),
  photo.find
);
router.get('/:id', auth.self, parser.integers({ id: true }), photo.findOne);
router.put('/',
  auth.self,
  auth.checkOwnership('photo'),
  auth.checkRelationship('plant', 'plantId'),
  parser.integers({ id: true }),
  photo.modify
);
router.delete('/:id', auth.self, parser.integers({ id: true }), photo.remove);

export default router;