import express from 'express';
import cors from 'cors';
import session from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';

import apiRoutes from './routes/api.js';
import prisma from './prismainstance.js';
import errorHandling from './middlewares/errorhandling.js';
import { generateAuth } from './middlewares/auth.js';
import { generateParser } from './middlewares/parser.js';
import { server as serverConfig } from '../littleterrarium.config.js';

const app = express();

if (serverConfig.useCors === true && serverConfig.corsOrigin) {
  app.use(
    cors({
      credentials: true,
      origin: serverConfig.corsOrigin
    })
  );
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static('dist'));
app.use('/public', express.static('public'));
// TODO: dev/prod
app.use(
  session({
    secret: serverConfig.session.secret,
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: false,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      // sameSite: 'none'
    },
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
app.use('/*', [generateAuth, generateParser]);
app.use('/api', apiRoutes);
app.use(errorHandling);

export default app;