import "jest"
import {BasicValidator} from "../../../src/services/validator/BasicValidator";
import {ValidationRulesBuilder} from "../../../src/services/validator/rule/builder/ValidationRulesBuilder";
import {ValidatorResult} from "../../../src/services/validator/ValidatorResult";
import {ValidationRule} from "../../../src/services/validator/rule/ValidationRule";

let validator = new BasicValidator();
let ruleBuilder = new ValidationRulesBuilder();

test("Can validate required email", () => {
    const validMails: Array<string> = ['test@example.com', 'test.test@example.com', 'test-test@example.com.pl'];
    const invalidMails: Array<string> = ['t@est@example.com', 'test.test@.com', 'test@com'];

    for (let mail of validMails) {
        let scope = {
            email: mail
        };
        let result: ValidatorResult = validator.validate(
            scope,
            ruleBuilder.newField('email')
                .setEmail()
                .end()
        );

        expect(result.isValid).toBeTruthy();
    }

    for (let mail of invalidMails) {
        let scope = {
            email: mail
        };
        let result: ValidatorResult = validator.validate(
            scope,
            ruleBuilder.newField('email')
                .setEmail()
                .end()
        );

        expect(result.isValid).toBeFalsy();
    }
});

test("Can validate required field", () => {
    let result: ValidatorResult = validator.validate(
        {},
        ruleBuilder.newField('name')
            .setRequired()
            .end()
    );

    expect(result.isValid).toBeFalsy();

    result = validator.validate(
        {'name': 'Random Name'},
        ruleBuilder.newField('name')
            .setRequired()
            .end()
    );

    expect(result.isValid).toBeTruthy();
});

test("Should valid undefined field that is not required", () => {
    let result: ValidatorResult = validator.validate(
        {},
        ruleBuilder.newField('name')
            .setEmail()
            .end()
    );

    expect(result.isValid).toBeTruthy();
});

test('Throw error on unknown validation type', () => {
    let nonexistentRule = new ValidationRule('random-field');
    nonexistentRule.addRule('RandomValidationTypeThatShouldNeverExist', true);
    ruleBuilder.addRule(nonexistentRule);

    expect(() => validator.validate({}, ruleBuilder)).toThrowError(/RandomValidationTypeThatShouldNeverExist/);
});
