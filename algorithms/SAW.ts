/*! *****************************************************************************
Copyright (c) the Trodoon authors. All rights reserved. MIT License.
***************************************************************************** */

enum Attribute {
  BENEFIT,
  COST,
}

class SAW {
  private alternatives: Array<string> = [];
  private criterias: Array<Array<number>> = [];
  private weights: Array<number> = [];
  private attributes: Array<Attribute> = [];
  private process: boolean = false;

  constructor(
    alternatives: Array<string>,
    criterias: Array<Array<number>>,
    weights: Array<number>,
    attributes: Array<Attribute>,
    process: boolean = false
  ) {
    this.weights = weights;
    this.criterias = criterias;
    this.alternatives = alternatives;
    this.attributes = attributes;
    this.process = process;
  }

  /**
   * @return void
   * function for error validation
   */
  private log(msg: string): void {
    console.log(msg);
    console.log(
      "Please check your argument, make sure the arguments follows the rules of use."
    );
    Deno.exit(0);
  }

  /**
   * @return void
   * check alternatives
   */
  private checkAlternatives(): void {
    if (!(this.alternatives.length > 0)) this.log("Alternatives empty");

    this.alternatives.forEach((value) => {
      if (value === "" || value.trim() === "")
        this.log("value of Alternatives at least must be one character");
    });
  }

  /**
   * @return void
   * check criterias
   */
  private checkCriterias(): void {
    if (!(this.criterias.length > 0)) this.log("row of Criterias are empty");

    if (this.criterias.length !== this.alternatives.length)
      this.log(
        "row length of Criterias is not equal with The Alternative length"
      );

    this.criterias.forEach((values, indexes) => {
      if (!(values.length > 0))
        this.log(`column ${indexes} of Criterias are empty`);

      if (values.length !== this.weights.length)
        this.log(
          `column ${indexes} length of Criterias is not equal with The Weights length`
        );

      if (values.length !== this.attributes.length)
        this.log(
          `The Attributes length of Criterias is not equal with The Weights length`
        );
    });
  }

  /**
   * @return void
   * check weights
   */
  private checkWeights(): void {
    if (!(this.weights.length > 0)) this.log("Weights are empty");

    let count: number = 0;
    this.weights.forEach((value) => {
      count += value;
      if (!Number.isInteger(value))
        this.log(`value ${value} of Weights is not integer`);
    });

    if (count != 100) this.log("total value of weights must be 100");
  }

  /**
   * @return void
   * switch Matrix (row to column)
   */
  private switchMatrix(): Array<Array<number>> {
    const result: Array<Array<number>> = [];

    this.weights.forEach((_, index) => {
      let temp: Array<number> = [];
      this.criterias.forEach((_, indexes) => {
        temp.push(this.criterias[indexes][index]);
      });
      result.push(temp);
    });

    return result;
  }

  /**
   * @return number[]
   * new array column to row
   */
  private attributeOfColumn(): Array<number> {
    const attributes = this.switchMatrix();
    const result: Array<number> = [];

    this.attributes.forEach((value, index) => {
      if (value === Attribute.BENEFIT) {
        result.push(Math.max(...attributes[index]));
      } else {
        result.push(Math.min(...attributes[index]));
      }
    });

    return result;
  }

  /**
   * @return number[][]
   * normalization of criterias
   */
  private normalization(): Array<Array<number>> {
    const result: Array<Array<number>> = [];
    const columns = this.attributeOfColumn();

    this.criterias.forEach((values) => {
      let map = values.map((value, index) => {
        if (this.attributes[index] === Attribute.BENEFIT) {
          return value / columns[index];
        } else {
          return columns[index] / value;
        }
      });
      result.push(map);
    });

    return result;
  }

  /**
   * @return number[]
   * convert each number to percent
   */
  private weightToPercent(): Array<number> {
    return [...this.weights.map((value) => value / 100)];
  }

  /**
   * @return number[]
   * weighted normalization
   */
  private weightedNormalization(): Array<number> {
    const result: Array<number> = [];
    const weights = this.weightToPercent();
    const criterias = this.normalization();

    criterias.forEach((values) => {
      let map: number = 0;
      values.map((value, index) => (map += weights[index] * value));
      result.push(map);
    });

    return result;
  }

  /**
   * @return string[]
   * sorting value from weightedNormalization (high to low)
   */
  private ranking(): Array<string> {
    const alternatives = this.alternatives;
    const weightedNormalization = this.weightedNormalization();

    const result = Object.fromEntries(
      alternatives.map((_, i) => [alternatives[i], weightedNormalization[i]])
    );

    const sorted = Object.keys(result)
      .sort((a, b) => result[a] - result[b])
      .reverse();

    return sorted;
  }

  /**
   * @return void
   * show class process if process true
   */
  private showProcess(vararg: any, name: string = ""): void {
    if (this.process) {
      console.log(`START: ${name}`);
      console.table(vararg);
      console.log(`END  : ${name}`);
      console.log("");
    }
  }

  /**
   * @return void
   * call all process function in this class
   */
  public result(): any {
    this.checkAlternatives();
    this.checkCriterias();
    this.checkWeights();

    const alternatives = this.alternatives;
    this.showProcess(alternatives, "Alternatives");

    const criterias = this.criterias;
    this.showProcess(criterias, "Criterias");

    const weights = this.weights;
    this.showProcess(weights, "Weights");

    const attributes = this.attributes;
    this.showProcess(attributes, "Attributes");

    const aoc = this.attributeOfColumn();
    this.showProcess(aoc, "Attribute Of Column");

    const n = this.normalization();
    this.showProcess(n, "Normalization");

    const wn = this.weightedNormalization();
    this.showProcess(wn, "Weighted Normalization");

    const ranking = this.ranking();
    this.showProcess(ranking, "Ranking of Alternatives");

    return this.process ? "" : ranking;
  }
}

export default SAW;
export { Attribute };
