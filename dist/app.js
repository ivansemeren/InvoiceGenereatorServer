'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _routes = require('./config/routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect('mongodb://localhost/invoice-builder', { useNewUrlParser: true });

var app = (0, _express2.default)();
var PORT = 3000;

app.use(_express2.default.json()); //body parser
app.use(_express2.default.urlencoded());
app.use((0, _morgan2.default)('dev'));
app.use('/api', _routes.router);
app.use(function (req, res, next) {
    var error = new Error('Not found');
    error.message = 'Invalid route';
    error.status = 404;
    next(error);
});
app.use(function (error, req, res, next) {
    //error handler
    res.status(error.status || 500);
    return res.json({
        error: {
            message: error.message
        }
    });
});

app.get('/', function (req, res) {
    res.json({
        msg: 'Welcome to Invoice builder backend'
    });
});

app.listen(PORT, function () {
    console.log('Server is running at the port ' + PORT);
});
//# sourceMappingURL=app.js.map