"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
require("reflect-metadata");
const WeatherDecorator_1 = require("../../../src/services/decorator/WeatherDecorator");
const Weather_1 = require("../../../src/model/Weather");
const moment = require("moment");
test("Decorate weather", () => {
    let weather = new Weather_1.Weather();
    let decorator = new WeatherDecorator_1.WeatherDecorator();
    weather.fetchedAt = 1525035634;
    weather.temperature = '39';
    weather.day = '2017-02-10';
    expect(decorator.decorate(weather)).toEqual(JSON.stringify({
        temperature: weather.temperature,
        day: weather.day,
        fetchedAt: moment.unix(weather.fetchedAt).format("DD-MM-YYYY HH:mm:ss")
    }));
});
