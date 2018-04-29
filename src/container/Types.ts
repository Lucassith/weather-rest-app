let TYPES = {
    Validator: {
        IValidator: Symbol('IValidator'),
        RuleBuilder: Symbol('RuleBuilder'),
        BasicValidator: Symbol('BasicValidatorr'),
    },
    Middlewares: {
        MailValidationMiddleware: Symbol('MailValidationMiddleware'),
        CityValidationMiddleware: Symbol('CityValidationMiddleware'),
    },
    Controllers: {
        WebsiteController: Symbol('WebsiteController'),
    },
};

export default TYPES;
