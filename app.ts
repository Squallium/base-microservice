import express = require('express');

// import routes
import {IndexRoutes} from "./routes/index.routes";

// middleware
import responseMiddleware from "./middlewares/response.middleware";
import errorMiddleware from "./middlewares/error.middleware";
import {MicroServiceApp} from "../app";

// library references
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// microservice instance
const microServiceApp = new MicroServiceApp()

// storing express instance
const app = express();

// synchronous process
Promise.all([].concat(microServiceApp.getSyncProcess())).then(results => {
    console.log("Sync process finished");

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug');

    // express initialization
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    // routes definition
    app.use('/', IndexRoutes);
    microServiceApp.setRoutes(app)

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        next(createError(404));
    });

    // intranet response handler
    app.use(responseMiddleware);

    // intranet error handler
    app.use(errorMiddleware);

    // error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });

    // app initialized
    app.emit('appStarted');
});
module.exports = app;
