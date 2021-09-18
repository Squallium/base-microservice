import {BaseError} from '../errors/base.error';
import {BaseResponse} from '../responses/base.response';
import {TableStateModel} from '../models/frontend/table-state.model';
import {ProductResponse} from '../../responses/product.response';
import {ControllerUtil} from '../utils/controller.util';
import {ProductError} from '../../errors/product.error';
import {ITableStateService} from '../interfaces/table-state-service.interface'

export class TableStateController {

    private tableStateService: ITableStateService;

    constructor(tableStateService: ITableStateService) {
        this.tableStateService = tableStateService;
    }

    find(body: any, callback: (err: BaseError, response: BaseResponse) => void): void {

        console.log(`Filter requested: ${JSON.stringify(body)}`)

        const tableState: TableStateModel = new TableStateModel(body);

        const queries = []
        // items
        queries.push(this.tableStateService.find(tableState));
        // total
        queries.push(this.tableStateService.count(tableState));
        // filters
        queries.push(this.tableStateService.filters(tableState));

        Promise.all(queries).then(results => {
            const response: ProductResponse = ProductResponse.instance(ProductResponse.PRODUCT_FOUND);
            response.items = results[0];
            response.total = results[1];
            response.filters = results[2];

            callback(null, response);
        }).catch(error => {
            ControllerUtil.manageUnknownError(error, ProductError, callback);
        });
    }
}
