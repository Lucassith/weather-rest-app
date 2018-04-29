export class ValidationRule {
    protected _fieldName: string;
    protected _rules: Map<string, any> = new Map<string, any>();

    get fieldName(): string {
        return this._fieldName
    }

    get rules(): Map<string, any> {
        return this._rules;
    }

    constructor(fieldName: string){
        this._fieldName = fieldName
    }

    addRule(name: string, value: any): ValidationRule{
        this._rules.set(name,  value);
        return this;
    }
}
