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
const inversify_1 = require("inversify");
const Types_1 = require("../../container/Types");
const app_conf_1 = require("../../../config/app.conf");
const ValidationRulesBuilder_1 = require("../../services/validator/rule/builder/ValidationRulesBuilder");
let CityValidationMiddleware = class CityValidationMiddleware {
    constructor(validator, ruleBuilder) {
        this._validator = validator;
        this._ruleBuilder = ruleBuilder;
    }
    handle(req, res, next) {
        const allowedCities = Array.isArray(app_conf_1.default.allowedCities) ? app_conf_1.default.allowedCities : [];
        const result = this._validator.validate(req.query, this._ruleBuilder
            .newField('city')
            .setRequired()
            .setValidValues(allowedCities)
            .end());
        if (!result.isValid) {
            res.send(result.messages);
            return;
        }
        return next();
    }
};
CityValidationMiddleware = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(Types_1.default.Validator.IValidator)),
    __param(1, inversify_1.inject(Types_1.default.Validator.RuleBuilder)),
    __metadata("design:paramtypes", [Object, ValidationRulesBuilder_1.ValidationRulesBuilder])
], CityValidationMiddleware);
exports.CityValidationMiddleware = CityValidationMiddleware;
