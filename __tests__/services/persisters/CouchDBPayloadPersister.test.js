"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
require("reflect-metadata");
const pouchdb_1 = require("pouchdb");
const PouchDBPayloadPersister_1 = require("../../../src/services/persisters/PouchDBPayloadPersister");
const Weather_1 = require("../../../src/model/Weather");
let rimraf = require('rimraf');
const testDbPath = './test';
const pdb = new pouchdb_1.default(testDbPath);
const persister = new PouchDBPayloadPersister_1.PouchDBPayloadPersister(pdb);
test("Persisting payload", () => __awaiter(this, void 0, void 0, function* () {
    const identifier = 'my-weather';
    const weather = {};
    weather['temperature'] = '20';
    yield persister.persistPayload(weather, identifier).then(() => __awaiter(this, void 0, void 0, function* () {
        yield persister.getPayload(identifier).then((persistedWeather) => {
            expect(persistedWeather).toEqual(weather);
        }).catch((error) => {
            fail(error);
        });
    })).catch((error) => {
        fail(error);
    });
}));
test("Updating weather", () => __awaiter(this, void 0, void 0, function* () {
    const identifier = 'my-weather';
    let weather = new Weather_1.Weather();
    weather.temperature = '20';
    yield persister.persistPayload(weather, identifier);
    weather = new Weather_1.Weather();
    weather.temperature = '100';
    yield persister.persistPayload(weather, identifier).then(() => __awaiter(this, void 0, void 0, function* () {
        yield persister.getPayload(identifier).then((persistedWeather) => {
            expect(persistedWeather).toEqual(weather);
        }).catch((error) => {
            fail(error);
        });
    })).catch((error) => {
        fail(error);
    });
}));
afterEach(() => __awaiter(this, void 0, void 0, function* () {
    yield rimraf(testDbPath, () => {
    });
}));
