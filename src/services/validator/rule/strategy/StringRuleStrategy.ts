import {IValidationRuleBuildStrategy} from "../../interface/IValidationRuleBuildStrategy";
import {ValidationRule} from "../ValidationRule";

export class StringRuleStrategy implements IValidationRuleBuildStrategy {
    protected readonly _lowercase;

    constructor(lowercase: boolean = false) {
        this._lowercase = lowercase
    }

    build(validationRules: Array<ValidationRule>): object {
        let fields: Map<string, string> = new Map<string, string>();

        for (let rule of validationRules) {
            let ruleString = Array.from(rule.rules.keys()).map((k) => {
                let v = rule.rules.get(k);
                switch (typeof v) {
                    case 'boolean': {
                        return k
                    }
                    case 'object' : {
                        if (Array.isArray(v)) {
                            let stringValue = this._lowercase ? v.join(',').toLowerCase() : v.join(',');
                            return `${k}:${stringValue}`
                        }
                    }
                }
            }).join('|');

            fields.set(rule.fieldName, ruleString);
        }
        const obj = {};
        fields.forEach((v, k) => {
            obj[k] = v
        });
        return obj;
    }
}
