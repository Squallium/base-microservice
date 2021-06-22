/**
 {
            "filter": {},
            "paginator": {
                "page": 1,
                "pageSize": 10,
                "total": 0,
                "pageSizes": []
            },
            "sorting": {
                "column": "id",
                "direction": "asc"
            },
            "searchTerm": "",
            "grouping": {
                "selectedRowIds": {},
                "itemIds": []
            }
        }
 */

export class BaseModel {
    constructor(data: object) {
        Object.assign(this, data);
    }
}

export class TableStateModel extends BaseModel {

    filter: {};
    paginator: PaginatorStateModel;
    sorting: SortStateModel;
    searchTerm: string;
    scan: ScanModel;

    constructor(data: object) {
        super(data);

        this.paginator = new PaginatorStateModel(data['paginator']);
        this.sorting = new SortStateModel(data['sorting']);
        this.scan = new ScanModel(data['scan']);
    }
}

export class PaginatorStateModel extends BaseModel{
    page: number;
    pageSize: number;
}

export class SortStateModel extends BaseModel {
    column: string;
    direction: string;

    query(): object {
        const result: object = {}
        result[this.column] = this.direction;
        return result;
    }
}

export class ScanModel extends BaseModel {
    ageDays: number;
    lastScanDays: number;
}