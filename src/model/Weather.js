"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Weather = /** @class */ (function () {
    function Weather() {
    }
    Object.defineProperty(Weather.prototype, "temperature", {
        get: function () {
            return this._temperature;
        },
        set: function (value) {
            this._temperature = value;
        },
        enumerable: true,
        configurable: true
    });
    return Weather;
}());
exports.Weather = Weather;
