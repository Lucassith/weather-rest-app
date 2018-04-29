let TYPES = {
    Controllers: {
        WebsiteController: Symbol('WebsiteController'),
    },
    Database: {
        PouchDB: Symbol('PouchDB')
    },
    Decorator: {
        IWeatherDecorator: Symbol('IWeatherDecorator')
    },
    Handler: {
        RequestHandler: {
            HttpHandler: Symbol('HttpHandler'),
            PersistingHandler: Symbol('PersistingHandler'),
            ConsoleLogHandler: Symbol('ConsoleLogHandler')
        },
        ProxyHandlers: Symbol('ProxyHandlers'),
    },
    HttpClient: {
        IHttpClient: Symbol('IHttpClient'),
        Axios: Symbol('Axios')
    },
    Middlewares: {
        MailValidationMiddleware: Symbol('MailValidationMiddleware'),
        CityValidationMiddleware: Symbol('CityValidationMiddleware'),
    },
    Persister: {
        IPayloadPersister: Symbol('IPayloadPersister')
    },
    Validator: {
        IValidator: Symbol('IValidator'),
        RuleBuilder: Symbol('RuleBuilder'),
        BasicValidator: Symbol('BasicValidatorr'),
    },
    Weather: {
        IWeatherService: Symbol('IWeatherService'),
        MetaWeather: Symbol('MetaWeather'),
    }
};

export default TYPES;
