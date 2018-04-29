"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var Validator_1 = require("./src/services/validator/Validator");
var Types_1 = require("./src/container/Types");
var WeatherController_1 = require("./src/http/controllers/WeatherController");
var MailValidationMiddleware_1 = require("./src/http/middleware/MailValidationMiddleware");
var CityValidationMiddleware_1 = require("./src/http/middleware/CityValidationMiddleware");
var container = new inversify_1.Container();
container.bind(Types_1.default.IValidator).to(Validator_1.Validator);
container.bind(Types_1.default.Controllers.WebsiteController).to(WeatherController_1.WeatherController);
container.bind(Types_1.default.Middlewares.MailValidationMiddleware).to(MailValidationMiddleware_1.MailValidationMiddleware);
container.bind(Types_1.default.Middlewares.CityValidationMiddleware).to(CityValidationMiddleware_1.CityValidationMiddleware);
exports.default = container;