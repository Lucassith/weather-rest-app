import PouchDB from 'pouchdb'
import {IPayloadPersister} from "./interface/IPayloadPersister";
import {Weather} from "../../model/Weather";
import {inject, injectable} from "inversify";
import TYPES from "../../container/Types";
import Database = PouchDB.Database;

@injectable()
export class PouchDBPayloadPersister implements IPayloadPersister {
    protected _pouchDB: Database;

    constructor(@inject(TYPES.Database.PouchDB) pouchDB: Database) {
        this._pouchDB = pouchDB;
    }

    async getPayload(identifier: string): Promise<object> {
        identifier = identifier.toLowerCase();
        let results = await this._pouchDB.get(this.getIdentifierWithCurrentDaySnapshot(identifier));
        if (results) {
            let weather = new Weather();
            return new Promise<Weather>(resolve => {
                return resolve(results['payload']);
            });
        }
    }

    persistPayload(payload: object, identifier: string): Promise<PouchDB.Core.Response> {
        identifier = identifier.toLowerCase();
        return this._pouchDB.put({
            _id: this.getIdentifierWithCurrentDaySnapshot(identifier),
            payload: payload
        }).catch(() => {
            return this._pouchDB.get(this.getIdentifierWithCurrentDaySnapshot(identifier)).then((doc) => {
                return this._pouchDB.put({
                    _id: this.getIdentifierWithCurrentDaySnapshot(identifier),
                    _rev: doc._rev,
                    payload: payload
                });
            });
        })
    }

    resetData(): boolean {
        throw new Error('Not implemented yet');
    }

    protected getIdentifierWithCurrentDaySnapshot(identifier: string): string {
        return identifier + new Date().toISOString().split('T')[0];
    }

}
