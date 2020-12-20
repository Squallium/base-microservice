import {BaseError} from "./base.error";
import {CodesError} from "./codes.error";


export class ProjectError extends BaseError {
    constructor(status: number, message: string, code: number) {
        super(status, 'SyncError', message, code);
    }

    static unknown(message: any): BaseError {
        return new ProjectError(500, message, this.UNKNOWN_ERROR);
    }

    static instance(code: number): ProjectError {
        switch (code) {
            case CodesError.PROJECT_NOT_FOUND:
                return new ProjectError(404, 'Project not found', code);
                break;
        }
    }
}
