"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var Types_1 = require("../../container/Types");
var app_conf_1 = require("../../../config/app.conf");
var ValidateAllowedCities_1 = require("../../services/validator/instances/ValidateAllowedCities");
var CityValidationMiddleware = /** @class */ (function () {
    function CityValidationMiddleware(validator) {
        this._validator = validator;
    }
    CityValidationMiddleware.prototype.handle = function (req, res, next) {
        var allowedCities = app_conf_1.default.allowedCities || [];
        var cityValidator = new ValidateAllowedCities_1.ValidateAllowedCities(this._validator, allowedCities);
        var result = cityValidator.validate(req.query);
        if (!result.isValid) {
            res.send(result.messages);
            return;
        }
        return next();
    };
    CityValidationMiddleware = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(Types_1.default.IValidator)),
        __metadata("design:paramtypes", [Object])
    ], CityValidationMiddleware);
    return CityValidationMiddleware;
}());
exports.CityValidationMiddleware = CityValidationMiddleware;
