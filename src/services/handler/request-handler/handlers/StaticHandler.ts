import {RequestHandler} from "../../RequestHandler";
import {RequestData} from "../../../../model/RequestData";

export class StaticHandler extends RequestHandler {
    private _reject: boolean = false;
    private _payload: Array<any> = [];
    private _payloadIndex = 0;

    get payload(): Array<any> {
        return this._payload;
    }

    set payload(value: Array<any>) {
        this._payload = value;
    }

    get reject(): boolean {
        return this._reject;
    }

    set reject(value: boolean) {
        this._reject = value;
    }

    constructor(payload: object, handler: RequestHandler | null = null) {
        super(handler);
        this._payload.push(payload);
    }

    addPayload(payload: any) {
        this._payload.push(payload);
    }

    protected incrementPayloadIndex() {
        if (this._payloadIndex + 1 >= this._payload.length){
            this._payloadIndex = 0;
            return;
        }
        this._payloadIndex++;
    }

    process(requestData: RequestData): Promise<object> {
        return new Promise<object>(((resolve, reject) => {
            let index = this._payloadIndex;
            this.incrementPayloadIndex();
            if (!this.reject) {
                return resolve(this.payload[index]);
            }
            return reject(this.payload[index]);
        }));
    }
}
