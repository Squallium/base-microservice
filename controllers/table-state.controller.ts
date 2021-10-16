import {BaseError} from '../errors/base.error';
import {BaseResponse} from '../responses/base.response';
import {TableStateModel} from '../models/frontend/table-state.model';
import {ControllerUtil} from '../utils/controller.util';
import {ITableStateService} from '../interfaces/table-state-service.interface'
import {TableStateResponse} from '../responses/table-state.response';

export class TableStateController {

    private tableStateService: ITableStateService;

    constructor(tableStateService: ITableStateService) {
        this.tableStateService = tableStateService;
    }

    find(body: any, response: TableStateResponse, errorClass: BaseError, callback: (err: BaseError, response: BaseResponse) => void): void {
        console.warn(`Filter requested: ${JSON.stringify(body)}`)

        const tableState: TableStateModel = new TableStateModel(body);

        const queries = []
        // items
        queries.push(this.tableStateService.find(tableState));
        // total
        queries.push(this.tableStateService.count(tableState));
        // filters
        queries.push(this.tableStateService.filters(tableState));

        Promise.all(queries).then(results => {
            response.items = results[0];
            response.total = results[1];
            response.filters = results[2];

            callback(null, response);
        }).catch(error => {
            ControllerUtil.manageUnknownError(error, errorClass, callback);
        });
    }
}
