import { Router } from 'express';
import userRoutes from './user.js';
import locationRoutes from './location.js';
import plantRoutes from './plant.js';
import specieRoutes from './specie.js';

const router = Router();

router.use('/user', userRoutes);
router.use('/location', locationRoutes);
router.use('/plant', plantRoutes);
router.use('/specie', specieRoutes);

export default router;