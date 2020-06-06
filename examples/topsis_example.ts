import { Topsis } from "./../algorithms/mod.ts";

/**
 * References : http://studyshut.blogspot.com/2018/11/contoh-perhitungan-manual-penyelesaian.html
 */

class TopsisExample {
  result() {
    const alternatives = [
      "Andi",
      "Beni",
      "Candra",
      "Dedi",
      "Erlin",
      "Firas",
      "Gugum",
      "Heri",
      "Indah",
    ];

    const weight = [4, 5, 4, 3, 4];

    const criterias = [
      [2, 3, 2, 1, 4, 5, 3, 3, 4],
      [4, 4, 2, 5, 1, 2, 3, 5, 5],
      [2, 4, 3, 2, 5, 2, 1, 4, 3],
      [4, 4, 4, 4, 5, 5, 5, 5, 5],
      [4, 3, 5, 3, 4, 3, 5, 3, 4],
    ];

    // Xn
    let x1 = this.formulaXn(criterias[0]);
    let x2 = this.formulaXn(criterias[1]);
    let x3 = this.formulaXn(criterias[2]);
    let x4 = this.formulaXn(criterias[3]);
    let x5 = this.formulaXn(criterias[4]);

    // Rn
    let r1 = this.formulaRn(criterias[0], this.formulaXn(criterias[0]));
    let r2 = this.formulaRn(criterias[1], this.formulaXn(criterias[1]));
    let r3 = this.formulaRn(criterias[2], this.formulaXn(criterias[2]));
    let r4 = this.formulaRn(criterias[3], this.formulaXn(criterias[3]));
    let r5 = this.formulaRn(criterias[4], this.formulaXn(criterias[4]));

    // Yn
    let y1 = this.formulaYn(weight[0], r1);
    let y2 = this.formulaYn(weight[1], r2);
    let y3 = this.formulaYn(weight[2], r3);
    let y4 = this.formulaYn(weight[3], r4);
    let y5 = this.formulaYn(weight[4], r5);

    // A+
    let aPlus = this.getAMax(y1, y2, y3, y4, y5);

    // A-
    let aMin = this.getAMin(y1, y2, y3, y4, y5);

    // // D+
    // const dMax1 = this.getDMax(1, y1);
    // const dMax2 = this.getDMax(1, y1);
    // const dMax3 = this.getDMax(1, y1);
    // const dMax4 = this.getDMax(1, y1);
    // const dMax5 = this.getDMax(1, y1);

    // console.log(dMax2);

    // // D-
    // const dMin1 = this.getDMin(y1);
    // const dMin2 = this.getDMin(y1);
    // const dMin3 = this.getDMin(y1);
    // const dMin4 = this.getDMin(y1);
    // const dMin5 = this.getDMin(y1);

    return aPlus;
  }

  private formulaXn(numbers: Array<number>): number {
    let sum = 0;
    numbers.map((number) => {
      sum += Math.pow(number, 2);
    });
    return Math.sqrt(sum);
  }

  private formulaRn(numbersC: Array<number>, numberX: number): Array<number> {
    let r: Array<number> = [];

    numbersC.forEach((number) => {
      r.push(number / numberX);
    });

    return r;
  }

  private formulaYn(weight: number, numberR: Array<number>): Array<number> {
    let y: Array<number> = [];

    numberR.forEach((number) => {
      y.push(number * weight);
    });

    return y;
  }

  private getAMax(...numbers: Array<number[]>): Array<number> {
    let a: number[] = [];

    let b: number[] = [];

    numbers.forEach((values) => {
      b.push(...values);
      values.forEach((value) => {
        a.push(value);
      });
    });

    // Math.max(...a);

    return a;
  }

  private getAMin(...numbers: Array<number[]>): Array<number> {
    let a: Array<number> = [];

    // numbers.forEach((number) => {
    //   a.push(number);
    // });

    // Math.max();

    return a;
  }

  private getDMax(aPlus: number, numbers: Array<number>): number {
    return Math.max(...numbers);
  }

  private getDMin(numbers: Array<number>): number {
    return Math.min(...numbers);
  }
}

const example = new TopsisExample();

console.log(example.result());
