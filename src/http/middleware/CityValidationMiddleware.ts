import {inject, injectable} from "inversify";
import TYPES from "../../container/Types";
import {IMiddleware} from "./IMiddleware";
import {Request, Response} from 'express';
import conf from '../../../config/app.conf';
import {IValidator} from "../../services/validator/interface/IValidator";
import {ValidationRulesBuilder} from "../../services/validator/rule/builder/ValidationRulesBuilder";

@injectable()
export class CityValidationMiddleware implements IMiddleware {
    protected _validator: IValidator;
    protected _ruleBuilder: ValidationRulesBuilder;

    constructor(
        @inject(TYPES.Validator.IValidator) validator: IValidator,
        @inject(TYPES.Validator.RuleBuilder) ruleBuilder: ValidationRulesBuilder
    ) {
        this._validator = validator;
        this._ruleBuilder = ruleBuilder;
    }

    handle(req: Request, res: Response, next: Function) {
        const allowedCities: Array<String> = Array.isArray(conf.allowedCities) ? conf.allowedCities : [];

        const result = this._validator.validate(
            req.query,
            this._ruleBuilder
                .newField('city')
                .setRequired()
                .setValidValues(allowedCities)
                .end()
        );

        if (!result.isValid) {
            res.send(result.messages);
            return;
        }

        return next();
    }
}
