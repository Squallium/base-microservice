import {BaseResponse} from './base.response';


export class TableStateResponse extends BaseResponse {
    public items: object;
    public total: number;
    public filters: object;

    buildData(): object {
        if (Array.isArray(this.items)) {
            let result: object[] = []
            for (let product of this.items) {
                result.push(this.flatItem(product));
            }

            if (this.total != undefined) {
                return {
                    'total': this.total,
                    'filters': this.filters,
                    'items': result
                }
            } else {
                return result;
            }
        } else {
            return undefined;
        }
    }

    public flatItem(item: object): object {
        return item;
    }

}
