import {BaseResponse} from "../responses/base.response";
import {BaseError} from "../errors/base.error";
import {MigrationError} from "../errors/migration.error";
import {MigrationResponse} from "../../responses/migration.response";
import {CodesResponse} from "../../responses/codes.response";
import {CodesError} from "../errors/codes.error";
import {MigrationService} from "../migration.service";


export class MigrationController {

    private migrationService: MigrationService;

    constructor() {
        this.migrationService = new MigrationService();
    }

    getItems(req: any, callback: (err: BaseError, response: BaseResponse) => void): void {
        const database: string = req.params.database;
        const coll_name: string = req.params.collection;

        for (let key in req.query) {
            console.log(key)
        }

        if (process.env.ENV == 'dev') {
            this.migrationService.getConnection(database, coll_name).then(collection => {
                if (collection) {
                    const query: any = req.query;
                    if (req.body.offset_date) {
                        query['date'] = {"$gte": req.body.offset_date}
                    }

                    collection.find(req.query).sort({date: 1}).toArray(function (err, items) {
                        if (err) {
                            callback(MigrationError.unknown(err.message), null);
                        } else {
                            const response: MigrationResponse = MigrationResponse.instance(CodesResponse.ITEMS_FOUND);
                            response.items = items;
                            callback(null, response);
                        }
                    });
                } else {
                    callback(MigrationError.instance(CodesError.COLLECTION_NOT_FOUND), null);
                }
            }).catch(err => {
                callback(err, null);
            });
        } else {
            callback(MigrationError.instance(CodesError.MIGRATION_FORBIDDEN), null);
        }
    }

    saveItems(req: any, callback: (err: BaseError, response: BaseResponse) => void): void {

    }

    deleteItems(req: any, callback: (err: BaseError, response: BaseResponse) => void): void {

    }

}
