import {inject, injectable, named} from "inversify";
import TYPES from "../../container/Types";
import {IValidator} from "../../services/validator/interface/IValidator";
import {IMiddleware} from "./IMiddleware";
import {Request, Response} from 'express'
import {ValidationRulesBuilder} from "../../services/validator/rule/builder/ValidationRulesBuilder";

@injectable()
export class MailValidationMiddleware implements IMiddleware {
    protected _ruleBuilder: ValidationRulesBuilder;

    constructor(
        @inject(TYPES.Validator.IValidator) @named('BasicValidator') validator: IValidator,
        @inject(TYPES.Validator.RuleBuilder) ruleBuilder: ValidationRulesBuilder
    ) {
        this._validator = validator;
        this._ruleBuilder = ruleBuilder;
    }

    protected _validator: IValidator;

    get validator(): IValidator {
        return this._validator;
    }

    handle(req: Request, res: Response, next: Function) {
        let validationResult = this._validator.validate(
            req.query,
            this._ruleBuilder
                .newField('email')
                .setEmail()
                .setRequired()
                .end()
        );

        if (validationResult.isValid) {
            return next()
        }
        res.send(validationResult.messages)
    }
}
