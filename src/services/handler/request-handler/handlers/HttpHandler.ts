import {RequestHandler} from "../../RequestHandler";
import {IHttpClient} from "../../../http-client/interface/IHttpClient";
import {inject, injectable} from "inversify";
import {RequestData} from "../../../../model/RequestData";
import TYPES from "../../../../container/Types";

@injectable()
export class HttpHandler extends RequestHandler {
    protected _httpClient: IHttpClient;

    constructor(@inject(TYPES.HttpClient.IHttpClient) httpClient: IHttpClient, handler: RequestHandler | null = null) {
        super(handler);
        this._httpClient = httpClient;
    }

    process(requestData: RequestData): Promise<object> {
        return this._httpClient.request(requestData);
    }
}
