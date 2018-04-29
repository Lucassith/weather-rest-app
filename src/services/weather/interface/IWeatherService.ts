import {Weather} from "../../../model/Weather";
import {ValidatorResult} from "../../validator/ValidatorResult";

export interface IWeatherService {
    readonly validationRules: object;
    validateInput(data: object): ValidatorResult;
    fetchWeather(data: object): Weather;
}
