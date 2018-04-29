import "jest"
import "reflect-metadata"
import PouchDB from 'pouchdb';
import {PouchDBPayloadPersister} from "../../../src/services/persisters/PouchDBPayloadPersister";
import {Weather} from "../../../src/model/Weather";

let rimraf = require('rimraf');
const testDbPath = './test';
const pdb = new PouchDB(testDbPath);
const persister = new PouchDBPayloadPersister(pdb);

test("Persisting payload", async () => {
    const identifier: string = 'my-weather';
    const weather: object = {};
    weather['temperature'] = '20';
    await persister.persistPayload(weather, identifier).then(async () => {
        await persister.getPayload(identifier).then((persistedWeather) => {
            expect(persistedWeather).toEqual(weather);
        }).catch((error) => {
            fail(error)
        });
    }).catch((error) => {
        fail(error);
    });

});


test("Updating weather", async () => {
    const identifier: string = 'my-weather';
    let weather: Weather = new Weather();
    weather.temperature = '20';
    await persister.persistPayload(weather, identifier);

    weather = new Weather();
    weather.temperature = '100';
    await persister.persistPayload(weather, identifier).then(async () => {
        await persister.getPayload(identifier).then((persistedWeather) => {
            expect(persistedWeather).toEqual(weather);
        }).catch((error) => {
            fail(error)
        });
    }).catch((error) => {
        fail(error);
    });
});

afterEach(async () => {
    await rimraf(testDbPath, () => {
    })
});
