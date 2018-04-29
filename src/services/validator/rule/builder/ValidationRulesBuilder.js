"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidatorRuleFieldBuilder_1 = require("./ValidatorRuleFieldBuilder");
class ValidationRulesBuilder {
    constructor() {
        this._rules = new Map();
    }
    get rules() {
        return this._rules;
    }
    addRule(rule) {
        this._rules.set(rule.fieldName, rule);
    }
    newField(fieldName) {
        return new ValidatorRuleFieldBuilder_1.ValidatorRuleFieldBuilder(fieldName, this);
    }
    build(strategy = null) {
        let rules = strategy ? strategy.build(Array.from(this._rules.values())) : this.rules;
        this.reset();
        return rules;
    }
    reset() {
        this._rules = new Map();
        return this;
    }
}
exports.ValidationRulesBuilder = ValidationRulesBuilder;
