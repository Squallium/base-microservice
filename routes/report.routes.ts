import * as express from 'express';
import {ReportController} from "../controllers/report.controller";
import {BaseError} from "../errors/base.error";
import {BaseResponse} from "../responses/base.response";

export const ReportRoutes = express.Router();

ReportRoutes.post('/', (req, res, next) => {
    const reportController: ReportController = new ReportController();

    reportController.create(req.body, (err: BaseError, response: BaseResponse) => {
        if (err) {
            next(err);
        } else {
            next(response);
        }
    });
});

ReportRoutes.get('/:reportId', (req, res, next) => {
    const reportController: ReportController = new ReportController();

    reportController.findById(req.params.reportId, (err: BaseError, response: BaseResponse) => {
        if (err) {
            next(err);
        } else {
            next(response);
        }
    });
});

ReportRoutes.get('/', (req, res, next) => {
    const reportController: ReportController = new ReportController();

    reportController.find(req.query, (err: BaseError, response: BaseResponse) => {
        if (err) {
            next(err);
        } else {
            next(response);
        }
    });
});
