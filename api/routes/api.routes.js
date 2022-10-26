import { Router } from 'express';
import userRoutes from './user.routes.js';
import locationRoutes from './location.routes.js';
import plantRoutes from './plant.routes.js';
import specieRoutes from './specie.routes.js';
import photoRoutes from './photo.routes.js';
import tasksRoutes from './tasks.routes.js';

const router = Router();

router.use('/user', userRoutes);
router.use('/location', locationRoutes);
router.use('/plant', plantRoutes);
router.use('/specie', specieRoutes);
router.use('/photo', photoRoutes);
router.use('/tasks', tasksRoutes);

export default router;