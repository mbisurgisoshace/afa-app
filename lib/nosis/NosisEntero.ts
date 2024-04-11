export class NosisEntero {
  private readonly _value: number;

  constructor(private readonly rawData: string) {
    this._value = parseInt(rawData);
  }

  getValue() {
    return this._value;
  }
}
