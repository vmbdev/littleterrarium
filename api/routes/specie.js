import { Router } from 'express';
import specie from '../controllers/specie.js';
import auth from '../middlewares/auth.js';

const router = Router();

router.post('/', auth.admin, specie.create);
router.get('/name/:name?', auth.self, specie.find);
router.get('/:id?', auth.self, specie.findOne);
router.put('/', auth.admin, specie.modify);
router.delete('/:id', auth.admin, specie.remove);

export default router;