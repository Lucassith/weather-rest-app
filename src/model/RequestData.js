"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RequestData {
    constructor(url, method, headers = null) {
        this._url = url;
        this._method = method;
        this._headers = headers;
    }
    get url() {
        return this._url;
    }
    get method() {
        return this._method;
    }
    get headers() {
        return this._headers;
    }
}
exports.RequestData = RequestData;
