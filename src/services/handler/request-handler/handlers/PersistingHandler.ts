import {RequestHandler} from "../../RequestHandler";
import {IPayloadPersister} from "../../../persisters/interface/IPayloadPersister";
import {RequestData} from "../../../../model/RequestData";
import {inject, injectable} from "inversify";
import TYPES from "../../../../container/Types";

@injectable()
export class PersistingHandler extends RequestHandler {
    protected _payloadPersister: IPayloadPersister;

    constructor(@inject(TYPES.Persister.IPayloadPersister) payloadPersister: IPayloadPersister, handler: RequestHandler | null = null) {
        super(handler);
        this._payloadPersister = payloadPersister;
    }

    afterProcess(payload: object, requestData: RequestData) {
        payload['fetchedAt'] = Math.round((new Date()).getTime() / 1000);
        this._payloadPersister.persistPayload(payload, requestData.url)
    }

    process(requestData: RequestData): Promise<object> {
        return this._payloadPersister.getPayload(requestData.url)
    }
}
