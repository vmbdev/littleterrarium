import { Router } from 'express';
import UserRoutes from './user.js';

const router = Router();

router.use('/user', UserRoutes);

export default router;