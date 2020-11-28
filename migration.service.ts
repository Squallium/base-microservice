import {Collection, Connection, mongo} from "mongoose";
import {MigrationError} from "./errors/migration.error";
import {CodesError} from "./errors/codes.error";

export class MigrationService {

    static CONNECTIONS: Map<string, Connection> = new Map<string, Connection>();

    constructor() {
    }

    registerConnection(conn_name: string, conn: Connection) {
        MigrationService.CONNECTIONS.set(conn_name, conn);
    }

    getConnection(conn_name: string, coll_name: string): Promise<Collection> {
        if (MigrationService.CONNECTIONS.has(conn_name)) {
            return Promise.resolve(MigrationService.CONNECTIONS.get(conn_name).collection(coll_name));
        } else {
            return Promise.reject(MigrationError.instance(CodesError.DATABASE_NOT_FOUND));
        }
    }

    convertToObjectId(item, field) {
        item[field] = item[field] ? new mongo.ObjectId(item[field]) : item[field];
    }

    convertArrayToObjectIdArray(item, field) {
        const results = []
        if (item[field]) {
            for (let result of item[field]) {
                results.push(new mongo.ObjectId(result));
            }
        }
        item[field] = results;
    }

    convertItem(item: any, coll_name: string): void {
        item['_id'] = new mongo.ObjectId(item['_id']);
        item['createdAt'] = item['createdAt'] ? new Date(item['createdAt']) : Date.now();
        item['updatedAt'] = item['updatedAt'] ? new Date(item['updatedAt']) : Date.now();
    }

    convertItems(items: any, coll_name: string): void {
        for (let item of items) {
            this.convertItem(item, coll_name);
        }
    }
}
