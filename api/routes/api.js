import { Router } from 'express';
import userRoutes from './user.js';
import locationRoutes from './location.js';
import plantRoutes from './plant.js';
import specieRoutes from './specie.js';
import photoRoutes from './photo.js';
import tasksRoutes from './tasks.js';

const router = Router();

router.use('/user', userRoutes);
router.use('/location', locationRoutes);
router.use('/plant', plantRoutes);
router.use('/specie', specieRoutes);
router.use('/photo', photoRoutes);
router.use('/tasks', tasksRoutes);

export default router;