import {Weather} from "../../../model/Weather";
import {Request} from "express";
import {RequestHandler} from "../../handler/RequestHandler";

export interface IWeatherService {
    fetchWeather(req: Request, handler: RequestHandler): Promise<Weather>;
}
