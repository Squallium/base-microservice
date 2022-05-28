import express = require('express');

// import routes
import {IndexRoutes} from "./routes/index.routes";
import {MigrationRoutes} from "./routes/migration.routes";
import {ReportRoutes} from "./routes/report.routes";
// middleware
import responseMiddleware from "./middlewares/response.middleware";
import errorMiddleware from "./middlewares/error.middleware";
import {MicroServiceApp} from "../app";
import {MigrationService} from "./migration.service";

// Lazy Begin Imports
import {CoreConn} from "./connections/core.conn";
// Lazy End Imports

// library references
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

// microservice instance
const microServiceApp = new MicroServiceApp()

// storing express instance
const app = express();

// AdminJS (former admin bro)
const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const AdminJSMongoose = require('@adminjs/mongoose')

// We have to tell AdminJS that we will manage mongoose resources with it
AdminJS.registerAdapter(AdminJSMongoose);

// register connections for migration
new MigrationService().registerConnection('core', CoreConn);

// synchronous process
Promise.all([
    // Lazy Begin Promises
    CoreConn,
    // Lazy End Promises
].concat(microServiceApp.getSyncProcess())).then(results => {
    console.log("Sync process finished");

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug');

    // express initialization
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(cors());
    app.use(express.static(path.join(__dirname, 'public')));

    // routes definition
    app.use('/', IndexRoutes);
    app.use('/migrations', MigrationRoutes)
    app.use('/reports', ReportRoutes)
    microServiceApp.setRoutes(app)

    // Pass all configuration settings to AdminBro
    const adminJs = new AdminJS({
        resources: [
            // Lazy Begin Bro
            CoreConn.model('Activity'),
            CoreConn.model('Job'),
            CoreConn.model('Module'),
            CoreConn.model('Project'),
            CoreConn.model('ProjectCategory'),
            CoreConn.model('ProjectType'),
            CoreConn.model('ProjectVersion'),
            CoreConn.model('Report'),
            CoreConn.model('Task'),
            CoreConn.model('Technology'),
            CoreConn.model('TechnologyType'),
            // Lazy End Bro
        ].concat(microServiceApp.getAdminBroResources()),
        rootPath: '/admin',
    });

    // Build and use a router which will handle all AdminBro routes
    const router = AdminJSExpress.buildRouter(adminJs);
    app.use(adminJs.options.rootPath, router);

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

        // show error message in console
        console.error(err.message);

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });

    // app initialized
    app.emit('appStarted');
});
module.exports = app;
