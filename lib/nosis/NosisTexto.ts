export class NosisTexto {
  private readonly _value: string;

  constructor(private readonly rawData: string) {
    this._value = rawData;
  }

  getValue() {
    return this._value;
  }
}
