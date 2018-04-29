"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationRule {
    constructor(fieldName) {
        this._rules = new Map();
        this._fieldName = fieldName;
    }
    get fieldName() {
        return this._fieldName;
    }
    get rules() {
        return this._rules;
    }
    addRule(name, value) {
        this._rules.set(name, value);
        return this;
    }
}
exports.ValidationRule = ValidationRule;
