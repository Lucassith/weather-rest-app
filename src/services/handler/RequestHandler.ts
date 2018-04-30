import {RequestData} from "../../model/RequestData";
import {injectable} from "inversify";

@injectable()
export abstract class RequestHandler {
    constructor(nextHandler: RequestHandler | null = null) {
        this._handler = nextHandler;
    }

    private _handler: RequestHandler | null;

    get handler(): RequestHandler | null {
        return this._handler;
    }

    set handler(value: RequestHandler | null) {
        this._handler = value;
    }

    async handle(requestData: RequestData): Promise<object> {
        return new Promise<object>(async (resolve, reject) => {
            let payload: object = null;
            try {
                payload = await this.process(requestData);
                return resolve(payload)
            }
            catch (e) {
                if (this._handler) {
                    try {
                        payload = await this._handler.handle(requestData);
                        if (payload) {
                            this.afterProcess(payload, requestData);
                        }
                        return resolve(payload);
                    }
                    catch(e) {}
                }
            }
            return reject('Unable to resolve payload in handlers.');
        })
    }

    abstract async process(requestData: RequestData): Promise<object>;

    afterProcess(weather: object, requestData: RequestData) {
        return;
    };
}
