"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Weather_1 = require("../../../model/Weather");
const RequestData_1 = require("../../../model/RequestData");
const inversify_1 = require("inversify");
let MetaweatherService = class MetaweatherService {
    constructor() {
        this._baseUrl = 'https://www.metaweather.com';
        this._citySearch = '/api/location/search/?query=';
        this._weatherUrl = '/api/location/${woeid}/';
    }
    fetchWeather(req, handler) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const city = req['city'];
                let woeId;
                let weather;
                try {
                    woeId = yield this.getWoeId(city, handler);
                    let payload = yield this.getWeatherPayload(woeId, handler);
                    weather = this.createWeatherObject(payload);
                }
                catch (e) {
                    return reject(e);
                }
                return resolve(weather);
            }));
        });
    }
    getWoeId(city, handler) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let response = [];
                try {
                    response = yield handler.handle(new RequestData_1.RequestData(this._baseUrl + this._citySearch + city, 'GET'));
                }
                catch (e) { }
                if (response.length > 0 && Number.isInteger(response[0]['woeid'])) {
                    return resolve(response[0]['woeid']);
                }
                return reject('MetaWeather did not resolve city: ' + city);
            }));
        });
    }
    getWeatherPayload(woeId, handler) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                let response = yield handler.handle(new RequestData_1.RequestData(this._baseUrl +
                    this._weatherUrl.replace('${woeid}', woeId.toString()), 'GET'));
                return resolve(response);
            }));
        });
    }
    createWeatherObject(payload) {
        let weather = new Weather_1.Weather();
        let firstForecast = payload['consolidated_weather'][0];
        weather.temperature = firstForecast['the_temp'];
        weather.day = firstForecast['applicable_date'];
        if (Number.isInteger(payload['fetchedAt'])) {
            weather.fetchedAt = payload['fetchedAt'];
        }
        return weather;
    }
};
MetaweatherService = __decorate([
    inversify_1.injectable()
], MetaweatherService);
exports.MetaweatherService = MetaweatherService;
