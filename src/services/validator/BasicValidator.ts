import {IValidator} from "./interface/IValidator";
import {ValidationRulesBuilder} from "./rule/builder/ValidationRulesBuilder";
import {ValidatorResult} from "./ValidatorResult";
import {ValidationRule} from "./rule/ValidationRule";

/**
 * TODO: Better composition. This is only to meet validation for "email sprawdzenie patterna". Use ValidatorJS (Validator.ts) instead.
 */
export class BasicValidator implements IValidator {
    validate(data: object, rules: ValidationRulesBuilder): ValidatorResult {
        const result: ValidatorResult = new ValidatorResult();
        const validationRules: Map<string, ValidationRule> = rules.build();

        for (let key of Array.from(validationRules.keys())) {
            let ruleSet = validationRules.get(key).rules;
            for (let validationType of Array.from(ruleSet.keys())) {
                let fn = this['validate' + validationType.charAt(0).toUpperCase() + validationType.slice(1)];
                if (typeof fn !== 'function') {
                    throw new Error('BasicValidator does not contain information on how to validate ' + validationType);
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

    protected buildMessage(fieldName: string, validationType: string, payload: any): object {
        let errorObject: object = {
            errors: {}
        };

        errorObject['errors'][fieldName] = `Value: ${payload} does not meet validation requirements for ${validationType}`;
        return errorObject;
    }

    protected validateRequired(value: any): boolean {
        return !!value;
    }

    protected validateEmail(value: any): boolean {
        if (typeof value === 'string') {
            return /^[a-z0-9][a-z0-9-_\.]+@[a-z0-9][a-z0-9-]+[a-z0-9]\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/.test(value)
        }

        // Up to required field to catch undefined. If not required then we don't care.
        return typeof value === 'undefined';
    }
}
