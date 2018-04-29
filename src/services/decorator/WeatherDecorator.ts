import {Weather} from "../../model/Weather";
import {IWeatherDecorator} from "./interface/IWeatherDecorator";
import {injectable} from "inversify";
import * as moment from 'moment';

@injectable()
export class WeatherDecorator implements IWeatherDecorator {
    decorate(weather: Weather): string {
        return JSON.stringify({
            temperature: weather.temperature,
            day: weather.day,
            fetchedAt: moment.unix(weather.fetchedAt).format("DD-MM-YYYY HH:mm:ss")
        });
    }
}
