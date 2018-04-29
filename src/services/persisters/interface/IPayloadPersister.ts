import {IPersister} from "./IPersister";

export interface IPayloadPersister extends IPersister {
    persistPayload(payload: object, identifier: string);

    getPayload(identifier: string): Promise<object>;
}
