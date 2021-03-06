"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const BasicValidator_1 = require("../../../src/services/validator/BasicValidator");
const ValidationRulesBuilder_1 = require("../../../src/services/validator/rule/builder/ValidationRulesBuilder");
const ValidationRule_1 = require("../../../src/services/validator/rule/ValidationRule");
let validator = new BasicValidator_1.BasicValidator();
let ruleBuilder = new ValidationRulesBuilder_1.ValidationRulesBuilder();
test("Can validate required email", () => {
    const validMails = ['test@example.com', 'test.test@example.com', 'test-test@example.com.pl'];
    const invalidMails = ['t@est@example.com', 'test.test@.com', 'test@com'];
    for (let mail of validMails) {
        let scope = {
            email: mail
        };
        let result = validator.validate(scope, ruleBuilder.newField('email')
            .setEmail()
            .end());
        expect(result.isValid).toBeTruthy();
    }
    for (let mail of invalidMails) {
        let scope = {
            email: mail
        };
        let result = validator.validate(scope, ruleBuilder.newField('email')
            .setEmail()
            .end());
        expect(result.isValid).toBeFalsy();
    }
});
test("Can validate required field", () => {
    let result = validator.validate({}, ruleBuilder.newField('name')
        .setRequired()
        .end());
    expect(result.isValid).toBeFalsy();
    result = validator.validate({ 'name': 'Random Name' }, ruleBuilder.newField('name')
        .setRequired()
        .end());
    expect(result.isValid).toBeTruthy();
});
test("Should valid undefined field that is not required", () => {
    let result = validator.validate({}, ruleBuilder.newField('name')
        .setEmail()
        .end());
    expect(result.isValid).toBeTruthy();
});
test('Throw error on unknown validation type', () => {
    let nonexistentRule = new ValidationRule_1.ValidationRule('random-field');
    nonexistentRule.addRule('RandomValidationTypeThatShouldNeverExist', true);
    ruleBuilder.addRule(nonexistentRule);
    expect(() => validator.validate({}, ruleBuilder)).toThrowError(/RandomValidationTypeThatShouldNeverExist/);
});
