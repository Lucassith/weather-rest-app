import {ValidationRule} from "../ValidationRule";
import {ValidatorRuleFieldBuilder} from "./ValidatorRuleFieldBuilder";
import {IValidationRuleBuildStrategy} from "../../interface/IValidationRuleBuildStrategy";

export class ValidationRulesBuilder {
    protected _rules: Map<string, ValidationRule> = new Map<string, ValidationRule>();

    get rules(): Map<string, ValidationRule> {
        return this._rules
    }

    addRule(rule: ValidationRule) {
        this._rules.set(rule.fieldName, rule)
    }

    newField(fieldName: string): ValidatorRuleFieldBuilder {
        return new ValidatorRuleFieldBuilder(fieldName, this)
    }

    build(strategy: IValidationRuleBuildStrategy|null = null) {
        let rules = strategy ? strategy.build(Array.from(this._rules.values())) : this.rules;
        this.reset();
        return rules;
    }

    reset(): ValidationRulesBuilder {
        this._rules = new Map<string, ValidationRule>();
        return this;
    }
}
