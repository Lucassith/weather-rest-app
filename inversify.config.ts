import "reflect-metadata";
import {Container, interfaces} from "inversify";
import {Validator} from "./src/services/validator/Validator";
import TYPES from "./src/container/Types"
import {IValidator} from "./src/services/validator/interface/IValidator";
import {WeatherController} from "./src/http/controllers/WeatherController";
import {MailValidationMiddleware} from "./src/http/middleware/MailValidationMiddleware";
import {CityValidationMiddleware} from "./src/http/middleware/CityValidationMiddleware";
import {BasicValidator} from "./src/services/validator/BasicValidator";
import {ValidationRulesBuilder} from "./src/services/validator/rule/builder/ValidationRulesBuilder";

const container: Container = new Container();

const validator: IValidator = new Validator();
container.bind<IValidator>(TYPES.Validator.IValidator).toConstantValue(validator).whenTargetIsDefault();

container.bind<ValidationRulesBuilder>(TYPES.Validator.RuleBuilder).toDynamicValue(() => {
    return new ValidationRulesBuilder();
});

const basicValidator: BasicValidator = new BasicValidator();
container.bind<IValidator>(TYPES.Validator.IValidator).toConstantValue(basicValidator).whenTargetNamed('BasicValidator');

container.bind<WeatherController>(TYPES.Controllers.WebsiteController).to(WeatherController);
container.bind<MailValidationMiddleware>(TYPES.Middlewares.MailValidationMiddleware).to(MailValidationMiddleware);
container.bind<CityValidationMiddleware>(TYPES.Middlewares.CityValidationMiddleware).to(CityValidationMiddleware);

export default container;
