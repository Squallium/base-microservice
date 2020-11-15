import {NextFunction, Request, Response} from 'express';
import {BaseResponse} from "../responses/base.response";


function responseMiddleware(baseResponse: Error, request: Request, response: Response, next: NextFunction) {

    if (baseResponse instanceof BaseResponse) {
        const status = baseResponse.status || 200;
        const message = baseResponse.message || 'Success';
        const code = baseResponse.code;
        const data = baseResponse.buildData(); // JSON.stringify(intranetResponse.buildData());

        if (baseResponse.verbose) {
            response
                .status(status)
                .send({
                    code,
                    message,
                    data
                });
        } else {
            response
                .status(status)
                .send(data);
        }
    } else {
        return next(baseResponse);
    }
}

export default responseMiddleware;
