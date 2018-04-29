"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RequestHandler_1 = require("../../RequestHandler");
class StaticHandler extends RequestHandler_1.RequestHandler {
    constructor(payload, handler = null) {
        super(handler);
        this._reject = false;
        this._payload = [];
        this._payloadIndex = 0;
        this._payload.push(payload);
    }
    get payload() {
        return this._payload;
    }
    set payload(value) {
        this._payload = value;
    }
    get reject() {
        return this._reject;
    }
    set reject(value) {
        this._reject = value;
    }
    addPayload(payload) {
        this._payload.push(payload);
    }
    incrementPayloadIndex() {
        if (this._payloadIndex + 1 >= this._payload.length) {
            this._payloadIndex = 0;
            return;
        }
        this._payloadIndex++;
    }
    process(requestData) {
        return new Promise(((resolve, reject) => {
            let index = this._payloadIndex;
            this.incrementPayloadIndex();
            if (!this.reject) {
                return resolve(this.payload[index]);
            }
            return reject(this.payload[index]);
        }));
    }
}
exports.StaticHandler = StaticHandler;
