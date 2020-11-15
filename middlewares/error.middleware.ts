
import { NextFunction, Request, Response } from 'express';
import {BaseError} from "../errors/base.error";


function errorMiddleware(baseError: Error, request: Request, response: Response, next: NextFunction) {

    if (baseError instanceof BaseError) {
        const status = baseError.status || 500;
        const message = baseError.message || 'Something went wrong';
        const code = baseError.code;

        if (baseError.verbose) {
            response
                .status(status)
                .send({
                    code,
                    message,
                });
        } else {
            response
                .status(status)
                .send({
                    code,
                });
        }

    } else {
        return next(baseError)
    }
}

export default errorMiddleware;
