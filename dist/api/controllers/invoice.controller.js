'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _invoice = require('../models/invoice.model');

var _invoice2 = _interopRequireDefault(_invoice);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    findAll: function findAll(req, res, next) {
        _invoice2.default.find().then(function (invoices) {
            return res.json(invoices);
        });
    },
    create: function create(req, res, next) {
        // const error = new Error('Error while creating invoices');
        // error.status = 401;
        // error.message = 'Custom error';
        // next(error);

        var _req$body = req.body,
            item = _req$body.item,
            qty = _req$body.qty,
            date = _req$body.date,
            due = _req$body.due,
            rate = _req$body.rate,
            tax = _req$body.tax;

        var schema = _joi2.default.object().keys({
            item: _joi2.default.string().required(),
            date: _joi2.default.date().required(),
            due: _joi2.default.date().required(),
            qty: _joi2.default.number().required(),
            tax: _joi2.default.number().optional(),
            rate: _joi2.default.number().optional()
        });

        var _Joi$validate = _joi2.default.validate(req.body, schema),
            error = _Joi$validate.error,
            value = _Joi$validate.value;
        // if(!item){
        //     return res.status(400).json({err: 'item is required'});
        // }
        // if(!date){
        //     return res.status(400).json({err: 'date is required'});
        // }
        // if(!due){
        //     return res.status(400).json({err: 'due is required'});
        // }
        // if(!qty){
        //     return res.status(400).json({err: 'qty is required'});
        // }


        if (error && error.details) {
            return res.status(400).json(error);
        }
        _invoice2.default.create(value).then(function (invoice) {
            return res.json(invoice);
        }).catch(function (err) {
            return res.status(500).json(err);
        });
    }
};
//# sourceMappingURL=invoice.controller.js.map