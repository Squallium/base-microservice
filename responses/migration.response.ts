import {BaseResponse} from "./base.response";
import {CodesResponse} from "./codes.response";

export class MigrationResponse extends BaseResponse {

    items: object;

    constructor(status: number, message: any, code: number, verbose = true) {
        super(status, 'MigrationResponse', message, code, verbose);
    }

    static instance(code: number, message?: object): MigrationResponse {
        switch (code) {
            case CodesResponse.ITEMS_FOUND:
                return new MigrationResponse(200, 'Items found', code, false);
                break;
            case CodesResponse.ITEM_SAVED:
                return new MigrationResponse(200, 'Item saved', code, true);
                break;
            case CodesResponse.ITEMS_SAVED:
                return new MigrationResponse(200, 'Items saved', code, true);
                break;
            case CodesResponse.ITEMS_DELETED:
                return new MigrationResponse(200, 'Items deleted', code, true);
                break;
        }
    }

    buildData(): object {
        return {
            'items': this.items
        };
    }
}
