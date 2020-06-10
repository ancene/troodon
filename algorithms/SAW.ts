/*! *****************************************************************************
Copyright (c) Trodoon. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
***************************************************************************** */

/**
 * References :
 */

enum Attribute {
  BENEFIT = "BENEFIT",
  COST = "COST",
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
   * @return true OR false
   * validation for every argument
   */
  private validation(): boolean {
    if (!(this.alternatives.length > 0)) {
      console.log("Alternatives Empty");
      return false;
    }

    if (!(this.criterias.length > 0)) {
      console.log("Row of Criterias Empty");
      return false;
    }
    if (!(this.criterias[0].length > 0)) {
      console.log("Column of Criterias Empty");
      return false;
    }

    if (!(this.weights.length > 0)) {
      console.log("Weights Empty");
      return false;
    }

    if (!(this.weights.length === this.criterias[0].length)) {
      console.log("Weights Length Not Equal with Column Length of Criterias");
      return false;
    }
    if (!(this.attributes.length === this.criterias[0].length)) {
      console.log(
        "Attributes Length Not Equal with Column Length of Criterias"
      );
      return false;
    }
    return true;
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
   * new array column to row
   */
  private attributeOfColumn(): Array<number> {
    const attributes: Array<Array<number>> = [];
    const result: Array<number> = [];

    this.weights.forEach((_, index) => {
      let temp: Array<number> = [];
      this.criterias.forEach((_, indexes) => {
        temp.push(this.criterias[indexes][index]);
      });
      attributes.push(temp);
    });

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
   * @param vararg
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

    // this.showProcess(result, "Weighted Normalization to Object");

    return sorted;
  }

  /**
   * @return void
   * show topsis process
   */
  private showProcess(vararg: any, name: string = ""): void {
    if (this.process) {
      console.log(`START: ${name}`);
      console.table(vararg);
      console.log(`END  : ${name}`);
      console.log("");
    }
  }

  public result() {
    if (!this.validation()) {
      console.error(
        "Please check your argument, make sure the arguments follows the rules of use."
      );
      Deno.exit(0);
    }

    const alternatives = this.alternatives;
    this.showProcess(alternatives, "Alternatives");

    const criterias = this.criterias;
    this.showProcess(criterias, "Criterias");

    const weights = this.weights;
    this.showProcess(weights, "Weights");

    const attributes = this.attributes;
    this.showProcess(attributes, "Attributes");

    const wtp = this.weightToPercent();
    this.showProcess(wtp, "Weight to Percent");

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
