/*! *****************************************************************************
Copyright (c) the Trodoon authors. All rights reserved. MIT License.
***************************************************************************** */

class Topsis {
  private alternatives: Array<string> = [];
  private criterias: Array<Array<number>> = [];
  private weights: Array<number> = [];
  private process: boolean = false;

  constructor(
    alternatives: Array<string>,
    criterias: Array<Array<number>>,
    weights: Array<number>,
    process: boolean = false
  ) {
    this.alternatives = alternatives;
    this.criterias = criterias;
    this.weights = weights;
    this.process = process;
  }

  /**
   * @return
   * validation params
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
    return true;
  }

  /**
   * @return Array<Array<number>>
   * matrixNormalization
   */
  private normalizationMatrix(): Array<Array<number>> {
    const sum: Array<number> = [];
    const root: Array<number> = [];
    const square: Array<Array<number>> = [];
    const result: Array<Array<number>> = [];

    // square
    this.criterias.forEach((values) =>
      square.push(values.map((value) => Math.pow(value, 2)))
    );
    // console.log() or console.table() here for show inner process

    // sum
    this.weights.forEach((_, index) => {
      let count = 0;
      square.forEach((_, indexes) => (count += square[indexes][index]));
      sum.push(count);
    });
    // console.log() or console.table() here for show inner process

    // root
    sum.forEach((value) => root.push(Math.sqrt(value)));
    // console.log() or console.table() here for show inner process

    // devide
    this.criterias.forEach((values) => {
      let temp: Array<number> = [];
      root.forEach((value, index) => {
        temp.push(values[index] / value);
      });
      result.push(temp);
    });

    return result;
  }

  /**
   * @return Array<Array<number>>
   * matrixNormalization
   */
  private weightedNormalizationMatrix(): Array<Array<number>> {
    const divide = this.normalizationMatrix();
    const result: Array<Array<number>> = [];

    divide.forEach((values) => {
      let map = values.map((value, index) => value * this.weights[index]);
      result.push(map);
    });

    return result;
  }

  /**
   * @return Array<number>
   * Value of Positive Ideal Solutions
   */
  private aMax(): Array<number> {
    const multiple = this.weightedNormalizationMatrix();
    const result: Array<number> = [];

    this.weights.forEach((_, index) => {
      let temp: Array<number> = [];
      let max: number = 0;
      multiple.forEach((_, indexes) => {
        temp.push(multiple[indexes][index]);
      });
      max = Math.max(...temp);
      result.push(max);
    });

    return result;
  }

  /**
   * @return Array<number>
   * Value of Negative Ideal Solutions
   */
  private aMin(): Array<number> {
    const multiple = this.weightedNormalizationMatrix();
    const result: Array<number> = [];

    this.weights.forEach((_, index) => {
      let temp: Array<number> = [];
      let min: number = 0;
      multiple.forEach((_, indexes) => {
        temp.push(multiple[indexes][index]);
      });
      min = Math.min(...temp);
      result.push(min);
    });

    return result;
  }

  /**
   * @return Array<number>
   * Determine the distance between the value of each alternative and the value of a positive ideal solution
   */
  private dMax(): Array<number> {
    const multiple = this.weightedNormalizationMatrix();
    const max = this.aMax();
    const result: Array<number> = [];

    multiple.forEach((values) => {
      let count = 0;
      max.forEach((value, index) => {
        count += Math.pow(value - values[index], 2);
      });
      result.push(Math.sqrt(count));
    });

    return result;
  }

  /**
   * @return Array<number>
   * Determine the distance between the value of each alternative and the value of a negative ideal solution
   */
  private dMin(): Array<number> {
    const multiple = this.weightedNormalizationMatrix();
    const min = this.aMin();
    const result: Array<number> = [];

    multiple.forEach((values) => {
      let count = 0;
      min.forEach((value, index) => {
        count += Math.pow(value - values[index], 2);
      });
      result.push(Math.sqrt(count));
    });

    return result;
  }

  /**
   * @param vararg
   * Determine the preference value for each alternative
   */
  private preferences(): Array<number> {
    const dMax = this.dMax();
    const dMin = this.dMin();
    const result: Array<number> = [];

    for (let i = 0; i < dMax.length; i++) {
      let num = 0;
      num = dMin[i] / (dMin[i] + dMax[i]);
      result.push(num);
    }

    return result;
  }

  /**
   * @param vararg
   * sorting value from preferences (high to low)
   */
  private ranking(): Array<string> {
    const alternatives = this.alternatives;
    const preferences = this.preferences();
    const result = Object.fromEntries(
      alternatives.map((_, i) => [alternatives[i], preferences[i]])
    );
    const sorted = Object.keys(result)
      .sort((a, b) => result[a] - result[b])
      .reverse();

    this.showProcess(result, "Preferences to Object");

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

  /**
   * @return any
   */
  public result(): any {
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

    const ndm = this.normalizationMatrix();
    this.showProcess(ndm, "Normalized Decision Matrix");

    const wndm = this.weightedNormalizationMatrix();
    this.showProcess(wndm, "Weighted Normalized Decision Matrix");

    const aMax = this.aMax();
    this.showProcess(aMax, "Value of Positive Ideal Solutions");

    const aMin = this.aMin();
    this.showProcess(aMin, "Value of Negative Ideal Solutions");

    const dMax = this.dMax();
    this.showProcess(dMax, "Distance of Positive Ideal Solutions");

    const dMin = this.dMin();
    this.showProcess(dMin, "Distance of Negative Ideal Solutions");

    const preference = this.preferences();
    this.showProcess(preference, "Preferences");

    const ranking = this.ranking();
    this.showProcess(ranking, "Ranking of Preferences");

    return this.process ? "" : ranking;
  }
}

export const topsis = (
  a: string[],
  c: number[][],
  w: number[],
  p: boolean = false
) => new Topsis(a, c, w, p).result();
