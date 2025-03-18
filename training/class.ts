class Fraction {
    constructor(private _numerator: number, private _denominator: number) {}

    get numerator(): number {
        return this._numerator;
    }

    get denominator(): number {
        return this._denominator;
    }
}

const f = new Fraction(1, 2);
console.log(f.numerator);
console.log(f.denominator);
