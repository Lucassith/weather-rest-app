import {Request, Response} from "express";
import {injectable} from "inversify";
import container from "../../../inversify.config";
import TYPES from "../../container/Types";
import {RequestHandler} from "../../services/handler/RequestHandler";
import {Weather} from "../../model/Weather";
import {IWeatherDecorator} from "../../services/decorator/interface/IWeatherDecorator";
import {IWeatherService} from "../../services/weather/interface/IWeatherService";

@injectable()
export class WeatherController {
    async show(req: Request, res: Response) {
        const weatherService = container.get<IWeatherService>(TYPES.Weather.IWeatherService);
        const handler = container.get<RequestHandler>(TYPES.Handler.ProxyHandlers);
        const weatherDecorator = container.get<IWeatherDecorator>(TYPES.Decorator.IWeatherDecorator);
        try {
            let weather: Weather = await weatherService.fetchWeather(req.query, handler);
            res.send(weatherDecorator.decorate(weather));
        } catch (e) {
            res.send(e);
        }
    }
}
