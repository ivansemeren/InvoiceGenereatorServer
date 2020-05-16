import express from 'express';
import clientController from './client.controller';
import passport from 'passport';

export const clientRouter = express.Router();
clientRouter
  .route('/')
  .post(passport.authenticate('jwt', { session: false }), clientController.create)
  .get(passport.authenticate('jwt', { session: false }), clientController.findAll);

clientRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), clientController.findOne)
  .delete(passport.authenticate('jwt', { session: false }), clientController.delete)
  .put(passport.authenticate('jwt', { session: false }), clientController.update);
