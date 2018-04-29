import {IValidationRuleBuildStrategy} from "../../interface/IValidationRuleBuildStrategy";
import {ValidationRule} from "../ValidationRule";

export class StringRuleStrategy implements IValidationRuleBuildStrategy{
    build(validationRules: Array<ValidationRule>): Map<string, string> {
        let fields: Map<string, string> = new Map<string, string>();

        for (let rule of validationRules) {
            let ruleString = Array.from(rule.rules.keys()).map((k) =>{
                let v = rule.rules.get(k);
                switch (typeof v) {
                    case 'boolean': {
                        return k
                    }
                    case 'object' : {
                        if (Array.isArray(v)) {
                            return `${k}:${v.join(',')}`
                        }
                    }
                }
            }).join('|');

            fields.set(rule.fieldName, ruleString);
        }
        return fields;
    }
}
