import "jest"
import {ValidatorRuleFieldBuilder} from "../../../../../src/services/validator/rule/builder/ValidatorRuleFieldBuilder";

test("Setting required field", () => {
    const fieldBuilder = new ValidatorRuleFieldBuilder('email');
    fieldBuilder.setRequired();

    let rule = fieldBuilder.build();
    expect(rule.rules.get('required')).toBeTruthy()
});

test("Setting email field", () => {
    const fieldBuilder = new ValidatorRuleFieldBuilder('email');
    fieldBuilder.setEmail();

    let rule = fieldBuilder.build();
    expect(rule.rules.get('email')).toBeTruthy()
});

test("Setting array of valid values", () => {
    const fieldBuilder = new ValidatorRuleFieldBuilder('name');
    fieldBuilder.setValidValues(['test', 'test2']);

    let rule = fieldBuilder.build();
    expect(rule.rules.get('in')).toEqual(['test', 'test2'])
});

test("Returns null on end if no parent builder set", () => {
    const fieldBuilder = new ValidatorRuleFieldBuilder('name');
    fieldBuilder.setRequired();

    expect(fieldBuilder.end()).toBeNull();
});

