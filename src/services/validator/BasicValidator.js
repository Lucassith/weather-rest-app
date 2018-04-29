"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidatorResult_1 = require("./ValidatorResult");
const UnknownValidationRuleError_1 = require("../../errors/UnknownValidationRuleError");
/**
 * TODO: Better composition. This is only to meet validation for "email sprawdzenie patterna". Use ValidatorJS (Validator.ts) instead.
 */
class BasicValidator {
    validate(data, rules) {
        const result = new ValidatorResult_1.ValidatorResult();
        const validationRules = rules.build();
        for (let key of Array.from(validationRules.keys())) {
            let ruleSet = validationRules.get(key).rules;
            for (let validationType of Array.from(ruleSet.keys())) {
                let fn = this['validate' + validationType.charAt(0).toUpperCase() + validationType.slice(1)];
                if (typeof fn !== 'function') {
                    throw new UnknownValidationRuleError_1.UnknownValidationRuleError('BasicValidator does not contain information on how to validate ' + validationType);
                }
                if (!fn.apply(null, [data[key]])) {
                    result.isValid = false;
                    result.messages = this.buildMessage(key, validationType, data[key]);
                    return result;
                }
            }
        }
        return result;
    }
    buildMessage(fieldName, validationType, payload) {
        let errorObject = {
            errors: {}
        };
        errorObject['errors'][fieldName] = `Value: ${payload} does not meet validation requirements for ${validationType}`;
        return errorObject;
    }
    validateRequired(value) {
        return !!value;
    }
    validateEmail(value) {
        if (typeof value === 'string') {
            return /^[a-z0-9][a-z0-9-_\.]+@[a-z0-9][a-z0-9-]+[a-z0-9]\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/.test(value);
        }
        // Up to required field to catch undefined. If not required then we don't care.
        return typeof value === 'undefined';
    }
}
exports.BasicValidator = BasicValidator;
