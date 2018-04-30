import {IWeatherService} from "../interface/IWeatherService";
import {Weather} from "../../../model/Weather";
import {RequestHandler} from "../../handler/RequestHandler";
import {RequestData} from "../../../model/RequestData";
import {injectable} from "inversify";


@injectable()
export class MetaweatherService implements IWeatherService {
    readonly _baseUrl: string = 'https://www.metaweather.com';
    readonly _citySearch: string = '/api/location/search/?query=';
    readonly _weatherUrl: string = '/api/location/${woeid}/';

    async fetchWeather(req: object, handler: RequestHandler): Promise<Weather> {
        return new Promise<Weather>(async (resolve, reject) => {
                const city = req['city'];
                let woeId: Number;
                let weather: Weather;
                try {
                    woeId = await this.getWoeId(city, handler);
                    let payload = await this.getWeatherPayload(woeId, handler);
                    weather = this.createWeatherObject(payload);
                } catch (e) {
                    return reject(e);
                }
                return resolve(weather);
        });
    }

    protected async getWoeId(city: string, handler: RequestHandler): Promise<Number> {
        return new Promise<Number>(async (resolve, reject) => {
            let response: any = [];
            try {
                response = await handler.handle(new RequestData(this._baseUrl + this._citySearch + city, 'GET'));
            } catch (e) {}

            if (response.length > 0 && Number.isInteger(response[0]['woeid'])) {
                return resolve(response[0]['woeid']);
            }
            return reject('MetaWeather did not resolve city: ' + city)
        });
    }

    protected async getWeatherPayload(woeId: Number, handler: RequestHandler): Promise<object> {
        return new Promise<object>(async resolve => {
            let response: object = await handler.handle(
                new RequestData(
                    this._baseUrl +
                    this._weatherUrl.replace(
                        '${woeid}', woeId.toString()
                    ),
                    'GET'
                )
            );
            return resolve(response);
        });
    }

    protected createWeatherObject(payload: object): Weather {
        let weather = new Weather();
        let firstForecast = payload['consolidated_weather'][0];

        weather.temperature = firstForecast['the_temp'];
        weather.day = firstForecast['applicable_date'];
        if (Number.isInteger(payload['fetchedAt'])) {
            weather.fetchedAt = payload['fetchedAt']
        }
        return weather;
    }
}
