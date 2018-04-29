import {Request, Response} from "express";
import {injectable} from "inversify";

@injectable()
export class WeatherController {
    show(req: Request, res: Response) {
        res.send('hooray');
    }
}
