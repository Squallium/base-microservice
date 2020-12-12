import {BaseError} from "./base.error";

export class ParamError extends BaseError {

    constructor(status: number, message: string, code: number) {
        super(status, 'ParamError', message, code);
    }

    static unknown(message: any): BaseError {
        return new ParamError(500, message, this.UNKNOWN_ERROR);
    }
}
