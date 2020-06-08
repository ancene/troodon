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
 * References : https://en.wikipedia.org/wiki/TOPSIS
 */

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
  private async normalizationMatrix(): Promise<Array<Array<number>>> {
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
  private async weightedNormalizationMatrix(): Promise<Array<Array<number>>> {
    const divide = await this.normalizationMatrix();
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
  private async aMax(): Promise<Array<number>> {
    const multiple = await this.weightedNormalizationMatrix();
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
  private async aMin(): Promise<Array<number>> {
    const multiple = await this.weightedNormalizationMatrix();
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
  private async dMax(): Promise<Array<number>> {
    const multiple = await this.weightedNormalizationMatrix();
    const max = await this.aMax();
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
  private async dMin(): Promise<Array<number>> {
    const multiple = await this.weightedNormalizationMatrix();
    const min = await this.aMin();
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
  private async preferences(): Promise<Array<number>> {
    const dMax = await this.dMax();
    const dMin = await this.dMin();
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
  private async ranking() {
    const alternatives = this.alternatives;
    const preferences = await this.preferences();
    const result = Object.fromEntries(
      alternatives.map((_, i) => [alternatives[i], preferences[i]])
    );
    const sorted = Object.keys(result)
      .sort((a, b) => result[a] - result[b])
      .reverse();

    await this.showProcess(result, "Preferences to Object");

    return sorted;
  }

  /**
   * @return void
   */
  private async showProcess(vararg: any, name: string = ""): Promise<void> {
    if (this.process) {
      console.log(`START: ${name}`);
      console.table(await vararg);
      console.log(`END  : ${name}`);
      console.log("");
    }
  }

  /**
   * @return any
   */
  public async result(): Promise<any> {
    if (!this.validation()) {
      console.error(
        "Please check your argument, make sure the arguments follows the rules of use."
      );
      Deno.exit(0);
    }

    const alternatives = this.alternatives;
    await this.showProcess(alternatives, "Alternatives");

    const criterias = this.criterias;
    await this.showProcess(criterias, "Criterias");

    const weights = this.weights;
    this.showProcess(weights, "Weights");

    const ndm = await this.normalizationMatrix();
    await this.showProcess(ndm, "Normalized Decision Matrix");

    const wndm = await this.weightedNormalizationMatrix();
    await this.showProcess(wndm, "Weighted Normalized Decision Matrix");

    const aMax = await this.aMax();
    await this.showProcess(aMax, "Value of Positive Ideal Solutions");

    const aMin = await this.aMin();
    await this.showProcess(aMin, "Value of Negative Ideal Solutions");

    const dMax = await this.dMax();
    await this.showProcess(dMax, "Distance of Positive Ideal Solutions");

    const dMin = await this.dMin();
    await this.showProcess(dMin, "Distance of Negative Ideal Solutions");

    const preference = await this.preferences();
    await this.showProcess(preference, "Preferences");

    const ranking = await this.ranking();
    await this.showProcess(ranking, "Ranking of Preferences");

    return this.process ? "" : ranking;
  }
}

export default Topsis;
