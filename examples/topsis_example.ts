/*! *****************************************************************************
Copyright (c) the Trodoon authors. All rights reserved. MIT License.
***************************************************************************** */

import { Topsis } from "../mod.ts"; // or import { Topsis } from "https://github.com/shandysiswandi/troodon/blob/master/mod.ts";

/**
 * @param ArrayOfNumberOrString (alternatives)
 * @param ArrayOfArrayOfNumber (criterias)
 * @param ArrayOfNumber (weight)
 * @param Boolean default false, change to true for show process
 * Result of Topsis Process or ranking of alternatives
 */

/**
 * Problems example 1: https://tugasakhir.id/contoh-perhitungan-spk-metode-topsis/
 */
const alternatives: Array<string> = ["Andi", "Beni", "Candra"];
const criterias: Array<Array<number>> = [
  [5, 2, 1, 4, 1],
  [5, 1, 1, 3, 1],
  [5, 3, 1, 4, 1],
];
const weight: Array<number> = [5, 3, 4, 2, 5];

const example = new Topsis(alternatives, criterias, weight, true).result();
console.log(example);

/**
 * Problems example 1: http://serbaserbi-publik.blogspot.com/2016/10/spk-pemilihan-guru-teladan-dengan.html
 */
const alternatif = ["Teacher A", "Teacher B", "Teacher C"];
const kriteria = [
  [80, 75, 80, 90, 85, 70, 65, 75],
  [90, 75, 85, 70, 80, 65, 80, 75],
  [75, 80, 70, 75, 85, 65, 70, 85],
];
const bobot = [10, 10, 20, 10, 15, 10, 10, 15];

const example2 = new Topsis(alternatif, kriteria, bobot).result();
console.table(example2);
