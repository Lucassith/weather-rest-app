import {injectable} from "inversify";
import "reflect-metadata";
import {IValidator} from "./interface/IValidator";
import {ValidatorResult} from "./ValidatorResult";
import {ValidationRulesBuilder} from "./rule/builder/ValidationRulesBuilder";
import {StringRuleStrategy} from "./rule/strategy/StringRuleStrategy";

const ValidatorJS = require('validatorjs');

@injectable()
export class Validator implements IValidator {
    validate(data: object, rules: ValidationRulesBuilder): ValidatorResult {
        let parsedRules = rules.build(new StringRuleStrategy());
        let validator = new ValidatorJS(data, parsedRules);
        let results = new ValidatorResult();
        results.isValid = validator.passes();
        results.messages = validator.errors;
        return results;
    }
}
