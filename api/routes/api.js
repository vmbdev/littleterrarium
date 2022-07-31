import { Router } from 'express';
import UserRoutes from './user.js';
import LocationRoutes from './location.js';

const router = Router();

router.use('/user', UserRoutes);
router.use('/location', LocationRoutes);

export default router;