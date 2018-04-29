"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_config_1 = require("./../inversify.config");
var Types_1 = require("../src/container/Types");
var express = require('express');
var router = express.Router();
var controller = inversify_config_1.default.get(Types_1.default.Controllers.WebsiteController);
var mailValidationMiddleware = inversify_config_1.default.get(Types_1.default.Middlewares.MailValidationMiddleware);
var cityValidationMiddleware = inversify_config_1.default.get(Types_1.default.Middlewares.CityValidationMiddleware);
router.get('/', 
/*(req, res, next) => {
    return mailValidationMiddleware.handle(req, res, next)
},
(req, res, next) => {
    return cityValidationMiddleware.handle(req, res, next)
},*/
function (req, res, next) {
    controller.show(req, res);
});
module.exports = router;
