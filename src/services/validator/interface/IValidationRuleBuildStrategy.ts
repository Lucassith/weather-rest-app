import {ValidationRule} from "../rule/ValidationRule";

export interface IValidationRuleBuildStrategy {
    build(validationRules: Array<ValidationRule>)
}
