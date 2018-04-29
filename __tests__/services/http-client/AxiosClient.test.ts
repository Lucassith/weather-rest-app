import "jest"
import "reflect-metadata"
import axiosMock from "axios-mock-adapter"
import {AxiosHttpClient} from "../../../src/services/http-client/AxiosHttpClient";
import axios from 'axios';
import {RequestData} from "../../../src/model/RequestData";

test("axios will return data on status 200", async () => {
    const mockedAxios = new axiosMock(axios);
    const url = '/test-url';
    const expectedResponse = {
        value: 'test'
    };
    mockedAxios.onGet(url).reply(200, expectedResponse);
    let client = new AxiosHttpClient(axios);
    let response = await client.request(new RequestData(url, 'GET'));

    expect(response).toEqual(expectedResponse);
});

test("axios will fail on status other than 200", async () => {
    const mockedAxios = new axiosMock(axios);
    const url = '/test-url';
    const expectedResponse = {
        value: 'test'
    };
    mockedAxios.onGet(url).reply(404, expectedResponse);
    let client = new AxiosHttpClient(axios);

    try {
        let response = await client.request(new RequestData(url, 'GET'));
    } catch (e) {
        expect(e).toBeDefined();
        return;
    }
    expect('').toBe('Non 200 should throw exception.');
});
