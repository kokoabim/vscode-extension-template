export class StringBuilder {
    private readonly array: Array<string> = [];

    constructor(...initialValues: string[]) {
        if (initialValues) this.array.push(...initialValues);
    }

    public get hasValue(): boolean { return this.array.length > 0; }

    public get length(): number { return this.array.length; }

    public append(value: string): this {
        this.array.push(value);
        return this;
    }

    public clear(): this {
        this.array.length = 0;
        return this;
    }

    public concat<T>(separator: string, ...values: T[]): this {
        this.array.push(values.join(separator));
        return this;
    }

    public substring(start: number, end?: number | undefined): string {
        return this.toString().substring(start, end);
    }

    public toString(): string {
        return this.array.join("");
    }
}
