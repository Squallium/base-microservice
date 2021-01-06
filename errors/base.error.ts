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

    static unknown(message: any, errorClass: any): BaseError {
        // if the error is unknown better to show the error in somewhere
        console.error(message);

        return new errorClass(500, message, this.UNKNOWN_ERROR);
    }
}
