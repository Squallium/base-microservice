import * as express from 'express';

export const IndexRoutes = express.Router();

IndexRoutes.get('/', function (req, res, next) {
    res.render('index', {title: 'Base Microservice'});
});

