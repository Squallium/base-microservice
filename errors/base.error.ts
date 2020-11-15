export class BaseError extends Error {
    static UNKNOWN_ERROR: number = 0

    status: number;
    type: string;
    message: string;
    code: number;
    verbose: boolean;

    constructor(status: number, type: string, message: string, code: number, verbose = true) {
        super(message);
        this.status = status;
        this.type = type;
        this.message = message;
        this.code = code;
        this.verbose = verbose
    }
}
