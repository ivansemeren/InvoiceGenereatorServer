import express from 'express';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import passport from 'passport';
import pdf from 'express-pdf';

import swaggerDocument from '../../config/swagger.json';
import { configureJWTStrategy } from './passport-jwt';

export const setGlobalMiddleware = app => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(pdf);
  app.use(logger('dev'));
  app.use(passport.initialize());
  configureJWTStrategy();
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      explorer: true,
    })
  );
};