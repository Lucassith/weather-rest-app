"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidatorResult {
    constructor() {
        this._isValid = true;
    }
    get isValid() {
        return this._isValid;
    }
    set isValid(value) {
        this._isValid = value;
    }
    get messages() {
        return this._messages;
    }
    set messages(value) {
        this._messages = value;
    }
}
exports.ValidatorResult = ValidatorResult;
