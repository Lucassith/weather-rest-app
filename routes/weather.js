"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_config_1 = require("./../inversify.config");
const Types_1 = require("../src/container/Types");
const express = require('express');
const router = express.Router();
const controller = inversify_config_1.default.get(Types_1.default.Controllers.WebsiteController);
const mailValidationMiddleware = inversify_config_1.default.get(Types_1.default.Middlewares.MailValidationMiddleware);
const cityValidationMiddleware = inversify_config_1.default.get(Types_1.default.Middlewares.CityValidationMiddleware);
router.get('/', (req, res, next) => {
    return mailValidationMiddleware.handle(req, res, next);
}, (req, res, next) => {
    return cityValidationMiddleware.handle(req, res, next);
}, (req, res, next) => {
    controller.show(req, res);
});
module.exports = router;
