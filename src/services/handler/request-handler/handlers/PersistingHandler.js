"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestHandler_1 = require("../../RequestHandler");
const inversify_1 = require("inversify");
const Types_1 = require("../../../../container/Types");
let PersistingHandler = class PersistingHandler extends RequestHandler_1.RequestHandler {
    constructor(payloadPersister, handler = null) {
        super(handler);
        this._payloadPersister = payloadPersister;
    }
    afterProcess(payload, requestData) {
        payload['fetchedAt'] = Math.round((new Date()).getTime() / 1000);
        this._payloadPersister.persistPayload(payload, requestData.url);
    }
    process(requestData) {
        return this._payloadPersister.getPayload(requestData.url);
    }
};
PersistingHandler = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(Types_1.default.Persister.IPayloadPersister)),
    __metadata("design:paramtypes", [Object, RequestHandler_1.RequestHandler])
], PersistingHandler);
exports.PersistingHandler = PersistingHandler;
