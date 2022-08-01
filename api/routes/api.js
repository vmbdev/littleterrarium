import { Router } from 'express';
import userRoutes from './user.js';
import locationRoutes from './location.js';

const router = Router();

router.use('/user', userRoutes);
router.use('/location', locationRoutes);

export default router;