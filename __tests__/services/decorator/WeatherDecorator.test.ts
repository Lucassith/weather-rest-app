import "jest"
import "reflect-metadata"
import {WeatherDecorator} from "../../../src/services/decorator/WeatherDecorator";
import {Weather} from "../../../src/model/Weather";
import * as moment from 'moment';

test("Decorate weather", () => {
    let weather = new Weather();
    let decorator = new WeatherDecorator();

    weather.fetchedAt = 1525035634;
    weather.temperature = '39';
    weather.day = '2017-02-10';

    expect(decorator.decorate(weather)).toContain(weather.temperature);
});
