import {RequestHandler} from "../../RequestHandler";
import {RequestData} from "../../../../model/RequestData";

export class ConsoleLogHandler extends RequestHandler {
    process(requestData: RequestData): Promise<object> {
        console.log(`Trying to fetch data from: ${requestData.url}. Full data: ${JSON.stringify(requestData)}`);
        return new Promise<object>((resolve, reject) => {
            return reject();
        })
    }

    afterProcess(weather: object, requestData: RequestData) {
        console.log(`Fetched object: ${JSON.stringify(weather)} on url ${requestData.url}`)
    }
}
