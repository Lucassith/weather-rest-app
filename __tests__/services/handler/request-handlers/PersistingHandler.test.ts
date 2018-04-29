import "reflect-metadata"
import {PersistingHandler} from "../../../../src/services/handler/request-handler/handlers/PersistingHandler";
import {IPayloadPersister} from "../../../../src/services/persisters/interface/IPayloadPersister";
import {RequestHandler} from "../../../../src/services/handler/RequestHandler";
import {RequestData} from "../../../../src/model/RequestData";

let persisterData = {};
let staticCalled = false;
const staticHandlerPayload = {message: 'Resolved in static mock'};
const mockedPersisterError = 'Mocked Persister entity not found.';

const MockedPayloadPersister = jest.fn<IPayloadPersister>(() => ({
    persistPayload: jest.fn((payload, identifier) => {
        persisterData[identifier] = payload;
    }),
    getPayload: jest.fn((identifier): Promise<object> => {
        return new Promise<object>((resolve, reject) => {
            if (persisterData[identifier]) {
                return resolve(persisterData[identifier])
            }
            return reject(mockedPersisterError);
        });
    }),
    resetData: jest.fn(() => {
        persisterData = {};
    })
}));

const StaticHandlerMock = jest.fn<RequestHandler>(() => ({
    handle: async (requestData: RequestData): Promise<object> => {
        return new Promise<object>((resolve, reject) => {
            if (staticCalled) {
                return reject('Static Handler called twice');
            }
            staticCalled = true;
            return resolve(staticHandlerPayload);
        })
    }
}));

const payloadPersister = new MockedPayloadPersister();
const handler = new PersistingHandler(payloadPersister);

beforeEach(() => {
    payloadPersister.resetData();
    staticCalled = false;
});

test("Return payload from persister", async () => {
    const identifier = 'http://test.com/';
    const payload = {message: 'Success'};
    payloadPersister.persistPayload(payload, identifier);
    let response = await handler.handle(new RequestData(identifier, 'GET'));

    expect(response).toEqual(payload);
});

test("Persisting handler fails to resolve promise if no payload found", async () => {
    const identifier = new RequestData('non-existent identifier', 'GET');

    try {
        await handler.handle(identifier);
    }
    catch (e) {
        expect(e).toEqual('Unable to resolve payload in handlers.');
        return;
    }
    expect('').toBe('Error should be called because payload shouldn\'t be available');
});

test("Handler will resolve another handler if payload not found", async () => {
    const identifier = 'non-existent identifier';
    const handler = new PersistingHandler(payloadPersister, new StaticHandlerMock());

    let response = await handler.handle(new RequestData(identifier, 'GET'));

    expect(response).toEqual(staticHandlerPayload);
});

test("Persister persists value", async () => {
    const identifier = 'non-existent identifier';
    const handler = new PersistingHandler(payloadPersister, new StaticHandlerMock());

    let response = await handler.handle(new RequestData(identifier, 'GET'));
    response = await handler.handle(new RequestData(identifier, 'GET'));

    expect(response).toEqual(staticHandlerPayload);

    payloadPersister.resetData();
    try {
        response = await handler.handle(new RequestData(identifier, 'GET'));
    } catch (e) {
        expect(e).toEqual('Unable to resolve payload in handlers.');
        return;
    }
    expect('').toBe('Should catch exception due to persister reset and static handler can\'t be called twice');
});
