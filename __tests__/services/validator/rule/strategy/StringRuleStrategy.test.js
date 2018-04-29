"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const ValidationRule_1 = require("../../../../../src/services/validator/rule/ValidationRule");
const StringRuleStrategy_1 = require("../../../../../src/services/validator/rule/strategy/StringRuleStrategy");
let rules = [];
let parsedString = new Map();
let stringRuleStrategy = new StringRuleStrategy_1.StringRuleStrategy();
test("Parses validation rules to string", () => {
    parsedString.set('email', 'email|required');
    parsedString.set('name', 'required');
    rules.push(new ValidationRule_1.ValidationRule('email').addRule('email', true).addRule('required', true));
    rules.push(new ValidationRule_1.ValidationRule('name').addRule('required', true));
    expect(stringRuleStrategy.build(rules)).toMatchObject(parsedString);
});
test("Parse array rule to string", () => {
    parsedString.set('name', 'in:lucas,van dijk');
    rules.push(new ValidationRule_1.ValidationRule('name').addRule('in', ['lucas', 'van dijk']));
    expect(stringRuleStrategy.build(rules)).toMatchObject(parsedString);
});
test("Lowercase", () => {
    parsedString.set('name', 'in:lucas,van dijk');
    rules.push(new ValidationRule_1.ValidationRule('name').addRule('in', ['LucAs', 'van DIJk']));
    expect(stringRuleStrategy.build(rules)).toMatchObject(parsedString);
});
