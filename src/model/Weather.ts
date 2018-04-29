export class Weather {
    private _temperature: string;

    get temperature(): string {
        return this._temperature;
    }

    set temperature(value: string) {
        this._temperature = value;
    }
}
