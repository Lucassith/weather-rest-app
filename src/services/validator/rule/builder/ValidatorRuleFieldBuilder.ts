import {ValidationRule} from "../ValidationRule";
import {ValidationRulesBuilder} from "./ValidationRulesBuilder";

export class ValidatorRuleFieldBuilder {
    protected _rule: ValidationRule;
    protected _builder: ValidationRulesBuilder | null;

    constructor(fieldName: string, builder: ValidationRulesBuilder | null = null) {
        this._rule = new ValidationRule(fieldName);
        this._builder = builder;
    }

    setRequired(): ValidatorRuleFieldBuilder {
        this._rule.addRule('required', true);
        return this;
    }

    setEmail(): ValidatorRuleFieldBuilder {
        this._rule.addRule('email', true);
        return this;
    }

    setValidValues(validValues: Array<String>): ValidatorRuleFieldBuilder {
        this._rule.addRule('in', validValues);
        return this;
    }

    end(): ValidationRulesBuilder | null {
        if (this._builder) {
            this._builder.addRule(this.build());
            return this._builder
        }
        return null;
    }

    build(): ValidationRule {
        return this._rule;
    }

}
