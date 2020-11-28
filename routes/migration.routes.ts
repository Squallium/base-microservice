import * as express from 'express';
import {MigrationController} from "../controllers/migration.controller";
import {BaseError} from "../errors/base.error";
import {BaseResponse} from "../responses/base.response";

export const MigrationRoutes = express.Router();

MigrationRoutes.get('/:database/:collection', (req, res, next) => {
    const migrationController: MigrationController = new MigrationController();

    migrationController.getItems(req, (err: BaseError, response: BaseResponse) => {
        if (err) {
            next(err);
        } else {
            next(response);
        }
    });
});


MigrationRoutes.post('/:database/:collection', (req, res, next) => {
    const migrationController: MigrationController = new MigrationController();

    migrationController.saveItems(req, (err: BaseError, response: BaseResponse) => {
        if (err) {
            next(err);
        } else {
            next(response);
        }
    });
});

MigrationRoutes.delete('/:database/:collection', (req, res, next) => {
    const migrationController: MigrationController = new MigrationController();

    migrationController.deleteItems(req, (err: BaseError, response: BaseResponse) => {
        if (err) {
            next(err);
        } else {
            next(response);
        }
    });
});
