import "jest"
import {ValidationRulesBuilder} from "../../../../../src/services/validator/rule/builder/ValidationRulesBuilder";
import {IValidationRuleBuildStrategy} from "../../../../../src/services/validator/interface/IValidationRuleBuildStrategy";

let rulesBuilder = new ValidationRulesBuilder();

test("Fluently builds array of rules", () => {
    const rules = rulesBuilder.newField('email')
        .setEmail()
        .setRequired()
        .end()
        .newField('name')
        .setValidValues(['danny', 'oxlade'])
        .end()
        .rules;

    expect(rules.size).toEqual(2);
});

test("Can build according to strategy", () => {
    const rules = rulesBuilder.newField('email')
        .setEmail()
        .setRequired()
        .end()
        .newField('name')
        .setValidValues(['danny', 'oxlade'])
        .end();

    const Mock = jest.fn<IValidationRuleBuildStrategy>(() => ({
        build: jest.fn(),
    }));

    const strategyMock = new Mock();

    rules.build(strategyMock);
    expect(strategyMock.build).toBeCalled();
});
