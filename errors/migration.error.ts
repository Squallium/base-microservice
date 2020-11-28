import {BaseError} from "./base.error";
import {CodesError} from "./codes.error";

export class MigrationError extends BaseError {
    constructor(status: number, message: string, code: number) {
        super(status, 'MigrationError', message, code);
    }

    static unknown(message: any): BaseError {
        return new MigrationError(500, message, this.UNKNOWN_ERROR);
    }

    static instance(code: number): MigrationError {
        switch (code) {
            case CodesError.MIGRATION_FORBIDDEN:
                return new MigrationError(404, 'Migration is not allowed', code);
                break;
            case CodesError.MIGRATION_REPORT_DUPLICATE:
                return new MigrationError(409, 'Duplicate entry', code);
                break;
        }
    }
}
