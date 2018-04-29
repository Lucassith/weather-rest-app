import {RequestData} from "../../../model/RequestData";

export interface IHttpClient {
    request(requestData: RequestData): Promise<object>;
}
