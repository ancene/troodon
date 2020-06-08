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

// import { Topsis } from "https://github.com/shandysiswandi/troodon/blob/master/mod.ts"; for different project
import { Topsis } from "../mod.ts";

/**
 * @argument Array<string>
 * alternatives
 */
const alternatives: Array<string> = ["Andi", "Beni", "Candra"];

/**
 * @argument Array<Array<number>>
 * Convert data into fuzzy form and then converted into a matrix.
 * Each row is an alternative and each column is a criterion.
 */
const criterias: Array<Array<number>> = [
  [5, 2, 1, 4, 1],
  [5, 1, 1, 3, 1],
  [5, 3, 1, 4, 1],
];

/**
 * @argument Array<number>
 * Weight (W) This argument indicates the weights of each criteria.
 */
const weight: Array<number> = [5, 3, 4, 2, 5];

/**
 * @param ArrayOfNumberOrString (alternatives)
 * @param ArrayOfArrayOfNumber (criterias)
 * @param ArrayOfNumber (weight)
 * @param Boolean default false, change to true for show process
 * Result of Topsis Process or ranking of alternatives
 */

const example = new Topsis(alternatives, criterias, weight).result();
console.log(example);
