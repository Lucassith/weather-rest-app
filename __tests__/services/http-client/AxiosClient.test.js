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
const axios_mock_adapter_1 = require("axios-mock-adapter");
const AxiosHttpClient_1 = require("../../../src/services/http-client/AxiosHttpClient");
const axios_1 = require("axios");
const RequestData_1 = require("../../../src/model/RequestData");
test("axios will return data on status 200", () => __awaiter(this, void 0, void 0, function* () {
    const mockedAxios = new axios_mock_adapter_1.default(axios_1.default);
    const url = '/test-url';
    const expectedResponse = {
        value: 'test'
    };
    mockedAxios.onGet(url).reply(200, expectedResponse);
    let client = new AxiosHttpClient_1.AxiosHttpClient(axios_1.default);
    let response = yield client.request(new RequestData_1.RequestData(url, 'GET'));
    expect(response).toEqual(expectedResponse);
}));
test("axios will fail on status other than 200", () => __awaiter(this, void 0, void 0, function* () {
    const mockedAxios = new axios_mock_adapter_1.default(axios_1.default);
    const url = '/test-url';
    const expectedResponse = {
        value: 'test'
    };
    mockedAxios.onGet(url).reply(404, expectedResponse);
    let client = new AxiosHttpClient_1.AxiosHttpClient(axios_1.default);
    try {
        let response = yield client.request(new RequestData_1.RequestData(url, 'GET'));
    }
    catch (e) {
        expect(e).toBeDefined();
        return;
    }
    expect('').toBe('Non 200 should throw exception.');
}));
