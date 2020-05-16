import express from 'express';
import mongoose from 'mongoose';
// import logger from 'morgan';
// import cors from 'cors';
import { setGlobalMiddleware } from './api/middlewares/global-middleware';
import { restRouter } from './api/index.js';
import { devConfig } from './config/env/development';

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(`mongodb://localhost/${devConfig.database}`, { useNewUrlParser: true });
const app = express();
const PORT = devConfig.port;

setGlobalMiddleware(app);
// app.use(express.json());     //body parser
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());
// app.use(logger('dev'));
// app.use(passport.initialize());
// app.use('api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
//     explorer: true
// }));

app.use('/api', restRouter); 
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.message = 'Invalid route';
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {     //error handler
    res.status(error.status || 500);
    return res.json({
        error: {
            message: error.message,
        },
    });
});

app.get('/', (req,res) =>{
    res.json({
        msg: 'Welcome to Invoice builder backend'
    })
});

app.listen(PORT, () =>{
    console.log(`Server is running at the port ${PORT}`);
})