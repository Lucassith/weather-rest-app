import "jest"
import "reflect-metadata"
import {MetaweatherService} from "../../../../src/services/weather/metaweather/MetaweatherService";
import {StaticHandler} from "../../../../src/services/handler/request-handler/handlers/StaticHandler";

const temperature = 8.25;
const fetchedAt = 11111111;
const date = "2018-04-29";
const woeResponse = [{'woeid': 11111}];
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

test("Metaweather returns promise of weather for valid data", async () => {
    let handler: StaticHandler = new StaticHandler(woeResponse);
    handler.addPayload(temperatureResponse);
    let service: MetaweatherService = new MetaweatherService();

    let weather = await service.fetchWeather({city: 'London'}, handler);

    expect(weather.temperature).toEqual(8.25);
    expect(weather.fetchedAt).toEqual(fetchedAt);
});


test("Metaweather returns error on reject", async () => {
    let handler = new StaticHandler(woeResponse);
    let service = new MetaweatherService();
    handler.reject = true;

    try {
        let weather = await service.fetchWeather({city: 'London'}, handler);
    } catch (e) {
        expect(e).toBeDefined();
        return;
    }

    expect('').toBe('Metaweather did not throw error on reject');
});
