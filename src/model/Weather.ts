export class Weather {
    private _temperature: string;

    get temperature(): string {
        return this._temperature;
    }

    set temperature(value: string) {
        this._temperature = value;
    }

    private _fetchedAt: number = Math.round((new Date()).getTime() / 1000);

    get fetchedAt(): number {
        return this._fetchedAt;
    }

    set fetchedAt(value: number) {
        this._fetchedAt = value;
    }

    private _day: string;

    get day(): string {
        return this._day;
    }

    set day(value: string) {
        this._day = value;
    }
}
