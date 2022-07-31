import { Router } from 'express';
import auth from '../middlewares/auth.js';
import User from '../controllers/user.js';

const router = Router();

router.post('/signin', User.signin);
router.post('/register', User.register);
router.put('/', auth, User.modify);
router.post('/restore', User.restore);
router.get('/logout', auth, User.logout);
router.get('/:id', User.find);
router.get('/validate/:key', User.verify);
router.get('/password/requirements', User.passwordRequirements);
router.get('/password/check/:password', User.checkPassword)

export default router;