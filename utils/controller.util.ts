import {BaseError} from "../errors/base.error";
import {BaseResponse} from "../responses/base.response";
import {OrderError} from "../../errors/order.error";

export class ControllerUtil {

    static manageUnknownError(error, callback: (err: BaseError, response: BaseResponse) => void) {
        if (error && error.code && error.message) {
            callback(new OrderError(500, error.message, error.code), null);
        } else {
            callback(error ? error : OrderError.unknown(error.message), null);
        }
    }
}
