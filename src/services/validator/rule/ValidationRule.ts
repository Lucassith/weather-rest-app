export class ValidationRule {
    constructor(fieldName: string) {
        this._fieldName = fieldName
    }

    protected _fieldName: string;

    get fieldName(): string {
        return this._fieldName
    }

    protected _rules: Map<string, any> = new Map<string, any>();

    get rules(): Map<string, any> {
        return this._rules;
    }

    addRule(name: string, value: any): ValidationRule {
        this._rules.set(name, value);
        return this;
    }
}
