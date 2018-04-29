"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const ValidationRulesBuilder_1 = require("../../../../../src/services/validator/rule/builder/ValidationRulesBuilder");
let rulesBuilder = new ValidationRulesBuilder_1.ValidationRulesBuilder();
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
    const Mock = jest.fn(() => ({
        build: jest.fn(),
    }));
    const strategyMock = new Mock();
    rules.build(strategyMock);
    expect(strategyMock.build).toBeCalled();
});
