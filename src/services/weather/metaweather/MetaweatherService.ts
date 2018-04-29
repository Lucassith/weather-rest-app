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

    // TODO: Refactor to small methods.
    async fetchWeather(req: object, handler: RequestHandler): Promise<Weather> {
        return new Promise<Weather>(async (resolve, reject) => {
            try {
                const city = req['city'];
                let response: any = await handler.handle(new RequestData(this._baseUrl + this._citySearch + city, 'GET'));
                if (response.length == 0 || !Number.isInteger(response[0]['woeid'])) {
                    return reject('MetaWeather could find city: ' + city);
                }
                const woeId = response[0]['woeid'] || null;
                response = await handler.handle(
                    new RequestData(
                        this._baseUrl +
                        this._weatherUrl.replace(
                            '${woeid}', woeId
                        ),
                        'GET'
                    )
                );

                let weather = new Weather();
                let firstForecast = response['consolidated_weather'][0];

                weather.temperature = firstForecast['the_temp'];
                weather.day = firstForecast['applicable_date'];
                if (Number.isInteger(response['fetchedAt'])) {
                    weather.fetchedAt = response['fetchedAt']
                }
                return resolve(weather);
            } catch (e) {
                return reject(e);
            }
        });
    }
}
