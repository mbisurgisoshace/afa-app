export class NosisBooleano {
  private readonly _value: boolean;

  constructor(private readonly rawData: string) {
    this._value = rawData === "Si" ? true : false;
  }

  getValue() {
    return this._value;
  }
}
