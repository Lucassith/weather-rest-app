"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ValidatorResult = /** @class */ (function () {
    function ValidatorResult() {
        this._isValid = true;
    }
    Object.defineProperty(ValidatorResult.prototype, "isValid", {
        get: function () {
            return this._isValid;
        },
        set: function (value) {
            this._isValid = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidatorResult.prototype, "messages", {
        get: function () {
            return this._messages;
        },
        set: function (value) {
            this._messages = value;
        },
        enumerable: true,
        configurable: true
    });
    return ValidatorResult;
}());
exports.ValidatorResult = ValidatorResult;
