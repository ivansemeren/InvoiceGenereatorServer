import Joi from 'joi';
import clientService from './client.service';
import HttpStatus, { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import Client from './client.model';

export default {
   async create(req, res){
    try{
      const {value, error} = clientService.validateCreateSchema(req.body);
      if(error && error.details) {
          return res.status(BAD_REQUEST).json(error);
      }
      const client = await Client.create(value);
      return res.json(client);
    }
    catch(err){
        return res.status(INTERNAL_SERVER_ERROR).json(err);
    }
   },
   async findAll(req, res){
       try{
            const clients = await Client.find();
            return res.json(clients);
       }
       catch(err) {
        return res.status(INTERNAL_SERVER_ERROR).json(err);
       }
   },
   async findOne(req, res){
       try {
         const client = await Client.findById(req.params.id);
         if (!client){
            return res.status(NOT_FOUND).json({err: 'client is not found'})
        }
         return res.json(client);
       }
       catch(err) {
        return res.status(INTERNAL_SERVER_ERROR).json(err);
       }
   },
   async delete(req, res){
    try{
        const client = await Client.findByIdAndRemove(req.params.id);
        if (!client){
            return res.status(NOT_FOUND).json({err: 'could not delete client'})
        }
        return res.json(client);
    }
    catch(err) {
        return res.status(INTERNAL_SERVER_ERROR).json(err);
    }
   },
//    update(req, res) {
//     const {id} = req.params;
//     const {value, error} = clientService.validateUpdateSchema(req.body);
//         if (error && error.details) {
//             return res.status(BAD_REQUEST).json(error);
//         }  

//     Client.findByIdAndUpdate({_id: id}, value, {new: true})
//         .then(client => res.json(client))
//         .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
// }
   async update(req, res){
    try{
        const {value, error} = clientService.validateUpdateSchema(req.body);
        if (error && error.details){
            return res.status(BAD_REQUEST).json(error);
        }
        const client = await Client.findOneAndUpdate({_id: req.params.id}, value, {new: true});
        return res.json(client);
    } catch(err) {
           return err => res.status(INTERNAL_SERVER_ERROR).json(err);
       }
   }
}