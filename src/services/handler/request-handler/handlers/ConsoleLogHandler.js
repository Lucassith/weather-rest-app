"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RequestHandler_1 = require("../../RequestHandler");
class ConsoleLogHandler extends RequestHandler_1.RequestHandler {
    process(requestData) {
        console.log(`Trying to fetch data from: ${requestData.url}. Full data: ${JSON.stringify(requestData)}`);
        return new Promise((resolve, reject) => {
            return reject();
        });
    }
    afterProcess(weather, requestData) {
        console.log(`Fetched object: ${JSON.stringify(weather)} on url ${requestData.url}`);
    }
}
exports.ConsoleLogHandler = ConsoleLogHandler;
