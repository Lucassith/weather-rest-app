import {IHttpClient} from "./interface/IHttpClient";
import {AxiosInstance} from 'axios';
import {RequestData} from "../../model/RequestData";
import TYPES from "../../container/Types";
import {inject, injectable} from "inversify";

@injectable()
export class AxiosHttpClient implements IHttpClient {
    protected _axios: AxiosInstance;

    constructor(@inject(TYPES.HttpClient.Axios) axios: AxiosInstance) {
        this._axios = axios;
    }

    request(requestData: RequestData): Promise<object> {
        return this._axios({
            method: requestData.method,
            url: requestData.url,
            headers: requestData.headers
        }).then(data => {
            return new Promise((resolve) => {
                return resolve(data.data);
            })
        });
    }
}
