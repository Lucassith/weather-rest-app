import {Request, Response} from "express";
import {injectable} from "inversify";
import container from "../../../inversify.config";
import TYPES from "../../container/Types";
import {MetaweatherService} from "../../services/weather/metaweather/MetaweatherService";
import {RequestHandler} from "../../services/handler/RequestHandler";
import {Weather} from "../../model/Weather";
import {IWeatherDecorator} from "../../services/decorator/interface/IWeatherDecorator";

@injectable()
export class WeatherController {
    async show(req: Request, res: Response) {
        const metaweather = container.get<MetaweatherService>(TYPES.Weather.IWeatherService);
        const handler = container.get<RequestHandler>(TYPES.Handler.ProxyHandlers);
        const weatherDecorator = container.get<IWeatherDecorator>(TYPES.Decorator.IWeatherDecorator);
        try {
            let weather: Weather = await metaweather.fetchWeather(req.query, handler);
            res.send(weatherDecorator.decorate(weather));
        } catch (e) {
            res.send(e);
            return;
        }
    }
}
