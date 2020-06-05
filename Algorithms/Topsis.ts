/*
 * References : https://en.wikipedia.org/wiki/TOPSIS
 *
 */
class Topsis {
  public numbers: Number;
  private paragraf: Array<String>;

  constructor(input?: number) {
    this.numbers = 1;
    this.paragraf = ["tes"];
  }

  public calc(params: Number): Number {
    return params;
  }

  private result(params: string): number {
    return parseInt(params);
  }
}

export default new Topsis();
