import "reflect-metadata";
const PouchDB = require('pouchdb');
import {Container} from "inversify";
import {Validator} from "./src/services/validator/Validator";
import TYPES from "./src/container/Types";
import {IValidator} from "./src/services/validator/interface/IValidator";
import {WeatherController} from "./src/http/controllers/WeatherController";
import {MailValidationMiddleware} from "./src/http/middleware/MailValidationMiddleware";
import {CityValidationMiddleware} from "./src/http/middleware/CityValidationMiddleware";
import {BasicValidator} from "./src/services/validator/BasicValidator";
import {ValidationRulesBuilder} from "./src/services/validator/rule/builder/ValidationRulesBuilder";
import Database = PouchDB.Database;
import pdbConfig from './config/pouchdb.conf';
import {RequestHandler} from "./src/services/handler/RequestHandler";
import {PersistingHandler} from "./src/services/handler/request-handler/handlers/PersistingHandler";
import {PouchDBPayloadPersister} from "./src/services/persisters/PouchDBPayloadPersister";
import {IPayloadPersister} from "./src/services/persisters/interface/IPayloadPersister";
import {IHttpClient} from "./src/services/http-client/interface/IHttpClient";
import {AxiosHttpClient} from "./src/services/http-client/AxiosHttpClient";
import axios from 'axios';
import {HttpHandler} from "./src/services/handler/request-handler/handlers/HttpHandler";
import {ConsoleLogHandler} from "./src/services/handler/request-handler/handlers/ConsoleLogHandler";
import {IWeatherService} from "./src/services/weather/interface/IWeatherService";
import {MetaweatherService} from "./src/services/weather/metaweather/MetaweatherService";
import {IWeatherDecorator} from "./src/services/decorator/interface/IWeatherDecorator";
import {WeatherDecorator} from "./src/services/decorator/WeatherDecorator";

const container: Container = new Container();
const validator: IValidator = new Validator();
const basicValidator: BasicValidator = new BasicValidator();
const pouchDB: Database = new PouchDB(pdbConfig.prefix);

container.bind(TYPES.HttpClient.Axios).toConstantValue(axios);
container.bind<Database>(TYPES.Database.PouchDB).toConstantValue(pouchDB);

container.bind<IValidator>(TYPES.Validator.IValidator).toConstantValue(validator).whenTargetIsDefault();
container.bind<IHttpClient>(TYPES.HttpClient.IHttpClient).to(AxiosHttpClient);
container.bind<IValidator>(TYPES.Validator.IValidator).toConstantValue(basicValidator).whenTargetNamed('BasicValidator');
container.bind<IPayloadPersister>(TYPES.Persister.IPayloadPersister).to(PouchDBPayloadPersister);
container.bind<IWeatherService>(TYPES.Weather.IWeatherService).to(MetaweatherService);
container.bind<IWeatherDecorator>(TYPES.Decorator.IWeatherDecorator).to(WeatherDecorator);

container.bind<ValidationRulesBuilder>(TYPES.Validator.RuleBuilder).toDynamicValue(() => {return new ValidationRulesBuilder()});
container.bind<RequestHandler>(TYPES.Handler.RequestHandler.HttpHandler).to(HttpHandler);
container.bind<RequestHandler>(TYPES.Handler.RequestHandler.PersistingHandler).to(PersistingHandler);
container.bind<RequestHandler>(TYPES.Handler.RequestHandler.ConsoleLogHandler).to(ConsoleLogHandler);
container.bind<WeatherController>(TYPES.Controllers.WebsiteController).to(WeatherController);
container.bind<MailValidationMiddleware>(TYPES.Middlewares.MailValidationMiddleware).to(MailValidationMiddleware);
container.bind<CityValidationMiddleware>(TYPES.Middlewares.CityValidationMiddleware).to(CityValidationMiddleware);

container.bind<RequestHandler>(TYPES.Handler.ProxyHandlers).toDynamicValue(() => {
   const persistingHandler = container.get<RequestHandler>(TYPES.Handler.RequestHandler.PersistingHandler);
   const httpHandler = container.get<RequestHandler>(TYPES.Handler.RequestHandler.HttpHandler);
   const consoleLogHandler = container.get<RequestHandler>(TYPES.Handler.RequestHandler.ConsoleLogHandler);

   consoleLogHandler.handler = httpHandler;
   persistingHandler.handler = consoleLogHandler;

   return persistingHandler;
});

export default container;
