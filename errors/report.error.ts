import {BaseError} from "./base.error";
import {CodesError} from "./codes.error";


export class ReportError extends BaseError {

    constructor(status: number, message: string, code: number) {
        super(status, 'ReportError', message, code);
    }

    static unknown(message: any): BaseError {
        return new ReportError(500, message, this.UNKNOWN_ERROR);
    }

    static instance(code: number): ReportError {
        switch (code) {
            case CodesError.REPORT_NOT_FOUND:
                return new ReportError(404, 'Report not found', code);
                break;
            case CodesError.ACTIVITY_NOT_FOUND:
                return new ReportError(404, 'Activity not found', code);
                break;
        }
    }

}
