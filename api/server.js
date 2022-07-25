import express from 'express';
import cors from 'cors';

import ApiRoutes from './routes/api.js';

import { server } from '../littleterrarium.config.js';

const app = express();
const port = process.env.PORT || server.port;

if (server.useCors === true && server.corsOrigin) app.use(cors({ origin: server.corsOrigin }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('dist'));

app.use('/api', ApiRoutes);

app.listen(port, () => {
  console.log(`Little Terrarium server started on ${port}`);
});