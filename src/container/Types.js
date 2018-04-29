"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TYPES = {
    IValidator: Symbol('IValidator'),
    Middlewares: {
        MailValidationMiddleware: Symbol('MailValidationMiddleware'),
        CityValidationMiddleware: Symbol('CityValidationMiddleware'),
    },
    Controllers: {
        WebsiteController: Symbol('WebsiteController'),
    },
};
exports.default = TYPES;
