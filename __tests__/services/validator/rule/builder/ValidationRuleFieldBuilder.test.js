"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const ValidatorRuleFieldBuilder_1 = require("../../../../../src/services/validator/rule/builder/ValidatorRuleFieldBuilder");
test("Setting required field", () => {
    const fieldBuilder = new ValidatorRuleFieldBuilder_1.ValidatorRuleFieldBuilder('email');
    fieldBuilder.setRequired();
    let rule = fieldBuilder.build();
    expect(rule.rules.get('required')).toBeTruthy();
});
test("Setting email field", () => {
    const fieldBuilder = new ValidatorRuleFieldBuilder_1.ValidatorRuleFieldBuilder('email');
    fieldBuilder.setEmail();
    let rule = fieldBuilder.build();
    expect(rule.rules.get('email')).toBeTruthy();
});
test("Setting array of valid values", () => {
    const fieldBuilder = new ValidatorRuleFieldBuilder_1.ValidatorRuleFieldBuilder('name');
    fieldBuilder.setValidValues(['test', 'test2']);
    let rule = fieldBuilder.build();
    expect(rule.rules.get('in')).toEqual(['test', 'test2']);
});
test("Returns null on end if no parent builder set", () => {
    const fieldBuilder = new ValidatorRuleFieldBuilder_1.ValidatorRuleFieldBuilder('name');
    fieldBuilder.setRequired();
    expect(fieldBuilder.end()).toBeNull();
});
