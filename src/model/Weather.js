"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Weather {
    constructor() {
        this._fetchedAt = Math.round((new Date()).getTime() / 1000);
    }
    get temperature() {
        return this._temperature;
    }
    set temperature(value) {
        this._temperature = value;
    }
    get fetchedAt() {
        return this._fetchedAt;
    }
    set fetchedAt(value) {
        this._fetchedAt = value;
    }
    get day() {
        return this._day;
    }
    set day(value) {
        this._day = value;
    }
}
exports.Weather = Weather;
