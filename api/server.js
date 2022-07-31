import express from 'express';
import cors from 'cors';
import session from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import ApiRoutes from './routes/api.js';
import prisma from './prismainstance.js';
import { server } from '../littleterrarium.config.js';

const app = express();
const port = process.env.PORT || server.port;

if (server.useCors === true && server.corsOrigin) app.use(cors({ origin: server.corsOrigin }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('dist'));
app.use(
  session({
    secret: server.session.secret,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(
      prisma,
      {
        checkPeriod: 2 * 60 * 1000,  //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }
    )
  })
);

app.use('/api', ApiRoutes);

app.listen(port, () => {
  console.log(`Little Terrarium server started on ${port}`);
});