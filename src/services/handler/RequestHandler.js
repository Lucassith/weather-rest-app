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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
let RequestHandler = class RequestHandler {
    constructor(nextHandler = null) {
        this._handler = nextHandler;
    }
    get handler() {
        return this._handler;
    }
    set handler(value) {
        this._handler = value;
    }
    handle(requestData) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let payload = null;
                try {
                    payload = yield this.process(requestData);
                    return resolve(payload);
                }
                catch (e) {
                    if (this._handler) {
                        try {
                            payload = yield this._handler.handle(requestData);
                            if (payload) {
                                this.afterProcess(payload, requestData);
                            }
                            return resolve(payload);
                        }
                        catch (e) { }
                    }
                }
                return reject('Unable to resolve payload in handlers.');
            }));
        });
    }
    afterProcess(weather, requestData) {
        return;
    }
    ;
};
RequestHandler = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [RequestHandler])
], RequestHandler);
exports.RequestHandler = RequestHandler;
