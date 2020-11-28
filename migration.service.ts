import {Collection, Connection} from "mongoose";
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


}
