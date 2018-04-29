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
require("reflect-metadata");
const PersistingHandler_1 = require("../../../../src/services/handler/request-handler/handlers/PersistingHandler");
const RequestData_1 = require("../../../../src/model/RequestData");
let persisterData = {};
let staticCalled = false;
const staticHandlerPayload = { message: 'Resolved in static mock' };
const mockedPersisterError = 'Mocked Persister entity not found.';
const MockedPayloadPersister = jest.fn(() => ({
    persistPayload: jest.fn((payload, identifier) => {
        persisterData[identifier] = payload;
    }),
    getPayload: jest.fn((identifier) => {
        return new Promise((resolve, reject) => {
            if (persisterData[identifier]) {
                return resolve(persisterData[identifier]);
            }
            return reject(mockedPersisterError);
        });
    }),
    resetData: jest.fn(() => {
        persisterData = {};
    })
}));
const StaticHandlerMock = jest.fn(() => ({
    handle: (requestData) => __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            if (staticCalled) {
                return reject('Static Handler called twice');
            }
            staticCalled = true;
            return resolve(staticHandlerPayload);
        });
    })
}));
const payloadPersister = new MockedPayloadPersister();
const handler = new PersistingHandler_1.PersistingHandler(payloadPersister);
beforeEach(() => {
    payloadPersister.resetData();
    staticCalled = false;
});
test("Return payload from persister", () => __awaiter(this, void 0, void 0, function* () {
    const identifier = 'http://test.com/';
    const payload = { message: 'Success' };
    payloadPersister.persistPayload(payload, identifier);
    let response = yield handler.handle(new RequestData_1.RequestData(identifier, 'GET'));
    expect(response).toEqual(payload);
}));
test("Persisting handler fails to resolve promise if no payload found", () => __awaiter(this, void 0, void 0, function* () {
    const identifier = new RequestData_1.RequestData('non-existent identifier', 'GET');
    try {
        yield handler.handle(identifier);
    }
    catch (e) {
        expect(e).toEqual('Unable to resolve payload in handlers.');
        return;
    }
    expect('').toBe('Error should be called because payload shouldn\'t be available');
}));
test("Handler will resolve another handler if payload not found", () => __awaiter(this, void 0, void 0, function* () {
    const identifier = 'non-existent identifier';
    const handler = new PersistingHandler_1.PersistingHandler(payloadPersister, new StaticHandlerMock());
    let response = yield handler.handle(new RequestData_1.RequestData(identifier, 'GET'));
    expect(response).toEqual(staticHandlerPayload);
}));
test("Persister persists value", () => __awaiter(this, void 0, void 0, function* () {
    const identifier = 'non-existent identifier';
    const handler = new PersistingHandler_1.PersistingHandler(payloadPersister, new StaticHandlerMock());
    let response = yield handler.handle(new RequestData_1.RequestData(identifier, 'GET'));
    response = yield handler.handle(new RequestData_1.RequestData(identifier, 'GET'));
    expect(response).toEqual(staticHandlerPayload);
    payloadPersister.resetData();
    try {
        response = yield handler.handle(new RequestData_1.RequestData(identifier, 'GET'));
    }
    catch (e) {
        expect(e).toEqual('Unable to resolve payload in handlers.');
        return;
    }
    expect('').toBe('Should catch exception due to persister reset and static handler can\'t be called twice');
}));
