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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Weather_1 = require("../../model/Weather");
const inversify_1 = require("inversify");
const Types_1 = require("../../container/Types");
let PouchDBPayloadPersister = class PouchDBPayloadPersister {
    constructor(pouchDB) {
        this._pouchDB = pouchDB;
    }
    getPayload(identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            identifier = identifier.toLowerCase();
            let results = yield this._pouchDB.get(this.getIdentifierWithCurrentDaySnapshot(identifier));
            if (results) {
                let weather = new Weather_1.Weather();
                return new Promise(resolve => {
                    return resolve(results['payload']);
                });
            }
        });
    }
    persistPayload(payload, identifier) {
        identifier = identifier.toLowerCase();
        return this._pouchDB.put({
            _id: this.getIdentifierWithCurrentDaySnapshot(identifier),
            payload: payload
        }).catch(() => {
            return this._pouchDB.get(this.getIdentifierWithCurrentDaySnapshot(identifier)).then((doc) => {
                return this._pouchDB.put({
                    _id: this.getIdentifierWithCurrentDaySnapshot(identifier),
                    _rev: doc._rev,
                    payload: payload
                });
            });
        });
    }
    //TODO: Implement data reset
    resetData() {
        throw new Error('Not implemented yet');
    }
    getIdentifierWithCurrentDaySnapshot(identifier) {
        return identifier + new Date().toISOString().split('T')[0];
    }
};
PouchDBPayloadPersister = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(Types_1.default.Database.PouchDB)),
    __metadata("design:paramtypes", [Object])
], PouchDBPayloadPersister);
exports.PouchDBPayloadPersister = PouchDBPayloadPersister;
