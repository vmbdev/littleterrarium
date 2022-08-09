import { Router } from 'express';
import auth from '../middlewares/auth.js';
import User from '../controllers/user.js';
import parser from '../middlewares/parser.js';

const router = Router();

router.post('/', User.register);
router.get('/:username', User.find);
router.get('/id/:id', parser.integers({ id: true }), User.find);
router.put('/', auth.self, User.modify);
router.delete('/:id', auth.admin, User.remove);
router.post('/signin', User.signin);
router.get('/logout', auth.self, User.logout);
router.post('/restore', User.restore);
router.get('/validate/:key', User.verify);
router.get('/password/requirements', User.passwordRequirements);
router.get('/password/check/:password', User.checkPassword)

export default router;