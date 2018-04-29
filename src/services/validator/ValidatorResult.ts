export class ValidatorResult {
    private _isValid: boolean = true;

    get isValid(): boolean {
        return this._isValid;
    }

    set isValid(value: boolean) {
        this._isValid = value;
    }

    private _messages: object;

    get messages(): object {
        return this._messages;
    }

    set messages(value: object) {
        this._messages = value;
    }
}
