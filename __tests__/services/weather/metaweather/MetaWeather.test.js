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
const MetaweatherService_1 = require("../../../../src/services/weather/metaweather/MetaweatherService");
const StaticHandler_1 = require("../../../../src/services/handler/request-handler/handlers/StaticHandler");
const temperature = 8.25;
const fetchedAt = 11111111;
const date = "2018-04-29";
const woeResponse = [{ 'woeid': 11111 }];
const temperatureResponse = {
    fetchedAt: fetchedAt,
    "consolidated_weather": [{
            "id": 6231022643445760,
            "weather_state_name": "Showers",
            "weather_state_abbr": "s",
            "wind_direction_compass": "NNE",
            "created": "2018-04-29T17:33:04.619980Z",
            "applicable_date": date,
            "min_temp": 5.3425000000000002,
            "max_temp": 8.4199999999999999,
            "the_temp": temperature,
            "wind_speed": 11.046657147967867,
            "wind_direction": 21.625111329343227,
            "air_pressure": 1013.275,
            "humidity": 82,
            "visibility": 9.016717370555952,
            "predictability": 73
        }],
    "title": "London",
    "location_type": "City",
    "woeid": 44418,
    "latt_long": "51.506321,-0.12714",
    "timezone": "Europe/London"
};
test("Metaweather returns promise of weather for valid data", () => __awaiter(this, void 0, void 0, function* () {
    let handler = new StaticHandler_1.StaticHandler(woeResponse);
    handler.addPayload(temperatureResponse);
    let service = new MetaweatherService_1.MetaweatherService();
    let weather = yield service.fetchWeather({ city: 'London' }, handler);
    expect(weather.temperature).toEqual(8.25);
    expect(weather.fetchedAt).toEqual(fetchedAt);
}));
test("Metaweather returns error on reject", () => __awaiter(this, void 0, void 0, function* () {
    let handler = new StaticHandler_1.StaticHandler(woeResponse);
    let service = new MetaweatherService_1.MetaweatherService();
    handler.reject = true;
    try {
        let weather = yield service.fetchWeather({ city: 'London' }, handler);
    }
    catch (e) {
        expect(e).toBeDefined();
        return;
    }
    expect('').toBe('Metaweather did not throw error on reject');
}));
