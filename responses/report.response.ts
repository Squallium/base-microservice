import {BaseResponse} from "./base.response";
import {CodesResponse} from "./codes.response";


export class ReportResponse extends BaseResponse {

    report: object;
    reports: object;

    constructor(status: number, message: object, code: number, verbose = false) {
        super(status, 'ReportResponse', message, code, verbose);
    }

    static instance(code: number, message?: object): ReportResponse {
        switch (code) {
            case CodesResponse.REPORT_FOUND:
                return new ReportResponse(200, message, code);
                break;
            case CodesResponse.REPORT_SAVED:
                return new ReportResponse(200, message, code, true);
                break;
        }
    }

    buildData(): object {
        const result: object = {};

        if (this.report) result['report'] = this.report;
        if (this.reports) result['reports'] = this.reports;

        return result;
    }
}
