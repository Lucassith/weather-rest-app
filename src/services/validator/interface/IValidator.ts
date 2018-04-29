import {ValidatorResult} from "../ValidatorResult";
import {ValidationRulesBuilder} from "../rule/builder/ValidationRulesBuilder";

export interface IValidator {
    validate(data: object, rules: ValidationRulesBuilder): ValidatorResult;
}
