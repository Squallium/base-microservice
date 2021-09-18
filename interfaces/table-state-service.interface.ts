import {TableStateModel} from '../models/frontend/table-state.model';


export interface ITableStateService {

    find(tableState: TableStateModel): Promise<object[]>;

    count(tableState: TableStateModel): Promise<number>;

    filters(tableState: TableStateModel): Promise<object>;
}
