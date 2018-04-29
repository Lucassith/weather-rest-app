export class RequestData {
    private readonly _url: string;
    private readonly _method: string;
    private readonly _headers: object | null;

    constructor(url: string, method: string, headers: object | null = null) {
        this._url = url;
        this._method = method;
        this._headers = headers;
    }

    get url(): string {
        return this._url;
    }

    get method(): string {
        return this._method;
    }

    get headers(): object | null {
        return this._headers;
    }
}
