import express from 'express';
import invoiceController from './invoice.controller';
import passport from 'passport';

export const invoiceRouter = express.Router();
invoiceRouter
  .route('/')
  .post(passport.authenticate('jwt', { session: false }), invoiceController.create)
  .get(passport.authenticate('jwt', { session: false }), invoiceController.findAll);

invoiceRouter
  .route('/:id')
  .put(passport.authenticate('jwt', { session: false }), invoiceController.update)
  .delete(passport.authenticate('jwt', { session: false }), invoiceController.delete)
  .get(passport.authenticate('jwt', { session: false }), invoiceController.findOne);

invoiceRouter.get('/:id/download', invoiceController.download);