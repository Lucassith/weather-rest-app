"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationRule_1 = require("../ValidationRule");
class ValidatorRuleFieldBuilder {
    constructor(fieldName, builder = null) {
        this._rule = new ValidationRule_1.ValidationRule(fieldName);
        this._builder = builder;
    }
    setRequired() {
        this._rule.addRule('required', true);
        return this;
    }
    setEmail() {
        this._rule.addRule('email', true);
        return this;
    }
    setValidValues(validValues) {
        this._rule.addRule('in', validValues);
        return this;
    }
    end() {
        if (this._builder) {
            this._builder.addRule(this.build());
            return this._builder;
        }
        return null;
    }
    build() {
        return this._rule;
    }
}
exports.ValidatorRuleFieldBuilder = ValidatorRuleFieldBuilder;
