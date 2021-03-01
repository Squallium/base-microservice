import {BaseError} from "../errors/base.error";
import {BaseResponse} from "../responses/base.response";

export class ControllerUtil {

    static manageUnknownError(error, errorClass: any, callback: (err: BaseError, response: BaseResponse) => void) {
        if (error && error.code && error.message) {
            console.error(error.message)
            callback(new errorClass(500, error.message, error.code), null);
        } else {
            callback(error ? error : BaseError.unknown(error.message, errorClass), null);
        }
    }
}
