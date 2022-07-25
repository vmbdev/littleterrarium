import { Router } from 'express';
import User from '../controllers/user.js';

const router = Router();

router.post('/signin', User.signin);
router.get('/logout', User.logout);
router.post('/register', User.register);
router.get('/find/:id', User.find);
router.get('/password/requirements', User.passwordRequirements);
router.get('/password/check/:password', User.checkPassword)

export default router;