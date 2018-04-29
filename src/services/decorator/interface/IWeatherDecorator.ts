import {Weather} from "../../../model/Weather";

export interface IWeatherDecorator {
    decorate(weather: Weather): string;
}
