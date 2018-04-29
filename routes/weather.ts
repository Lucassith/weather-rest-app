import container from "./../inversify.config"
import {WeatherController} from "../src/http/controllers/WeatherController";
import TYPES from "../src/container/Types";
import {IMiddleware} from "../src/http/middleware/IMiddleware";

const express = require('express');
const router = express.Router();

const controller = container.get<WeatherController>(TYPES.Controllers.WebsiteController);

const mailValidationMiddleware = container.get<IMiddleware>(TYPES.Middlewares.MailValidationMiddleware);
const cityValidationMiddleware = container.get<IMiddleware>(TYPES.Middlewares.CityValidationMiddleware);

router.get('/',
    (req, res, next) => {
        return mailValidationMiddleware.handle(req, res, next)
    },
    (req, res, next) => {
        return cityValidationMiddleware.handle(req, res, next)
    },
    (req, res, next) => {
        controller.show(req, res)
    }
);

module.exports = router;
