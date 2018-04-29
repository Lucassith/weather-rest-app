import "jest"
import {ValidationRule} from "../../../../../src/services/validator/rule/ValidationRule";
import {StringRuleStrategy} from "../../../../../src/services/validator/rule/strategy/StringRuleStrategy";

let rules: Array<ValidationRule> = [];
let parsedString: Map<string, string> = new Map<string, string>();
let stringRuleStrategy = new StringRuleStrategy();

test("Parses validation rules to string", () => {
    parsedString.set('email', 'email|required');
    parsedString.set('name', 'required');

    rules.push(new ValidationRule('email').addRule('email', true).addRule('required', true));
    rules.push(new ValidationRule('name').addRule('required', true));

    expect(stringRuleStrategy.build(rules)).toMatchObject(parsedString);
});

test("Parse array rule to string", () => {
    parsedString.set('name', 'in:lucas,van dijk');

    rules.push(new ValidationRule('name').addRule('in', ['lucas', 'van dijk']));
    expect(stringRuleStrategy.build(rules)).toMatchObject(parsedString);
});

test("Lowercase", () => {
    parsedString.set('name', 'in:lucas,van dijk');

    rules.push(new ValidationRule('name').addRule('in', ['LucAs', 'van DIJk']));
    expect(stringRuleStrategy.build(rules)).toMatchObject(parsedString);
})
