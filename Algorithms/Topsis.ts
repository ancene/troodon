/**
 * References : https://en.wikipedia.org/wiki/TOPSIS
 */

class Topsis {
  private alternative: Array<number> | Array<string>;
  private criteria: Array<number> | Array<string>;
  private sample: Array<number> | Array<string>;
  private weight: Array<number> | Array<string>;

  constructor() {
    this.alternative = [];
    this.criteria = [];
    this.sample = [];
    this.weight = [];
  }

  get getAlternative() {
    return this.alternative;
  }

  set setAlternative(params: number[] | string[]) {
    this.alternative = params;
  }

  get getCriteria() {
    return this.criteria;
  }

  set setCriteria(params: number) {
    this.criteria = params;
  }

  get getSample() {
    return this.sample;
  }

  set setSample(params: number) {
    this.sample = params;
  }

  get getWeight() {
    return this.weight;
  }

  set setWeight(params: number) {
    this.weight = params;
  }
}

export default new Topsis();
