/*! *****************************************************************************
Copyright (c) the Trodoon authors. All rights reserved. MIT License.
***************************************************************************** */

import { Attribute } from "./../enums.ts";

class WPM {
  private alternatives: Array<string> = [];
  private criterias: Array<Array<number>> = [];
  private weights: Array<number> = [];
  private attributes: Array<Attribute> = [];

  constructor(
    alternatives: Array<string>,
    criterias: Array<Array<number>>,
    weights: Array<number>,
    attributes: Array<Attribute>
  ) {
    this.alternatives = alternatives;
    this.criterias = criterias;
    this.weights = weights;
    this.attributes = attributes;
  }

  /**
   * @return
   */
  private log(msg: string) {
    console.error(msg);
    Deno.exit();
  }

  /**
   * @return void
   */
  private checkAlternatives(): void {
    if (!(this.alternatives.length > 0)) {
      this.log("Alternatives empty");
    }

    this.alternatives.forEach((value) => {
      if (value === "" || value.trim() === "") {
        this.log("value of Alternatives at least must be one character");
      }
    });
  }

  /**
   * @return void
   */
  private checkCriterias(): void {
    if (!(this.criterias.length > 0)) {
      this.log("row of Criterias are empty");
    }

    if (this.criterias.length !== this.alternatives.length) {
      this.log(
        "row length of Criterias is not equal with The Alternative length"
      );
    }

    this.criterias.forEach((values, indexes) => {
      if (!(values.length > 0)) {
        this.log(`column ${indexes} of Criterias are empty`);
      }

      if (values.length !== this.weights.length) {
        this.log(
          `column ${indexes} length of Criterias is not equal with The Weights length`
        );
      }

      if (values.length !== this.attributes.length) {
        this.log(
          `The Attributes length of Criterias is not equal with The Weights length`
        );
      }
    });
  }

  /**
   * @return void
   */
  private checkWeights(): void {
    if (!(this.weights.length > 0)) {
      this.log("Weights are empty");
    }

    this.weights.forEach((value) => {
      if (!Number.isInteger(value)) {
        this.log(`value ${value} of Weights is not integer`);
      }
    });
  }

  /**
   * @return number[]
   */
  private weightImprovement(): Array<number> {
    const result: Array<number> = [];
    const sum = this.weights.reduce((a, b) => a + b);

    this.weights.forEach((value, index) => {
      if (this.attributes[index] === Attribute.BENEFIT) {
        result.push(value / sum);
      } else result.push(-(value / sum));
    });

    return result;
  }

  /**
   * @return number[]
   */
  private valueVectorS(): Array<number> {
    const result: Array<number> = [];
    const wi = this.weightImprovement();

    this.criterias.forEach((values, indexes) => {
      let temp = 1;
      values.forEach((value, index) => {
        temp *= Math.pow(value, wi[index]);
      });
      result.push(temp);
    });

    return result;
  }

  /**
   * @return number[]
   */
  private preference(): Array<number> {
    const result: Array<number> = [];
    const vvs = this.valueVectorS();
    const vvsSum = vvs.reduce((a, b) => a + b);
    vvs.forEach((value) => result.push(value / vvsSum));
    return result;
  }

  /**
   * @return string[]
   */
  private ranking(): Array<string> {
    const alternatives = this.alternatives;
    const preference = this.preference();

    const result = Object.fromEntries(
      alternatives.map((_, i) => [alternatives[i], preference[i]]).sort()
    );

    const sorted = Object.keys(result)
      .sort((a, b) => result[a] - result[b])
      .reverse();

    return sorted;
  }

  /**
   * @return string[]
   */
  public result(): Array<string> {
    this.checkAlternatives();
    this.checkCriterias();
    this.checkWeights();

    return this.ranking();
  }

  /**
   * @return object
   */
  private showProcess(): object {
    this.checkAlternatives();
    this.checkCriterias();
    this.checkWeights();

    return {
      weightImprovement: this.weightImprovement(),
      valueVectorS: this.valueVectorS(),
      preference: this.preference(),
      ranking: this.ranking(),
    };
  }
}

export const wpm = (
  a: Array<string>,
  c: Array<Array<number>>,
  w: Array<number>,
  attr: Array<Attribute>
) => new WPM(a, c, w, attr).result();
