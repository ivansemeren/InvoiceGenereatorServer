"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var InvoiceSchema = new Schema({
    item: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    due: {
        type: Date,
        required: true
    },
    rate: {
        type: Number
    },
    tax: {
        type: Number
    }

});

exports.default = _mongoose2.default.model('Invoice', InvoiceSchema);
//# sourceMappingURL=invoice.model.js.map