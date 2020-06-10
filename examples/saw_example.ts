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

import { SAW, AttributeSaw } from "../mod.ts";

/**
 * Problems example 1: https://aeroyid.wordpress.com/2014/01/16/metodesimple-additive-weighting-saw/
 */
const alternatives = ["Indra", "Roni", "Putri", "Dani", "Ratna", "Mira"];
const criterias = [
  [70, 50, 80, 60],
  [50, 60, 82, 70],
  [85, 55, 80, 75],
  [82, 70, 65, 85],
  [75, 75, 85, 74],
  [62, 50, 75, 80],
];
const weights = [35, 25, 25, 15];
const attributes = [
  AttributeSaw.BENEFIT,
  AttributeSaw.BENEFIT,
  AttributeSaw.BENEFIT,
  AttributeSaw.BENEFIT,
];
const example = new SAW(alternatives, criterias, weights, attributes);
console.log(example.result());

/**
 * Problems example 2: https://informasi-anakutm.blogspot.com/2016/06/cara-perhitungan-dan-contoh-kasus.html
 */
const alternatives2 = ["A1", "A2", "A3", "A4"];
const criterias2 = [
  [150, 15, 2, 2, 3],
  [500, 200, 2, 3, 2],
  [200, 10, 3, 1, 3],
  [350, 100, 3, 1, 2],
];
const weights2 = [25, 15, 30, 25, 5];
const attributes2 = [
  AttributeSaw.COST,
  AttributeSaw.BENEFIT,
  AttributeSaw.BENEFIT,
  AttributeSaw.COST,
  AttributeSaw.BENEFIT,
];

const example2 = new SAW(alternatives2, criterias2, weights2, attributes2);
console.log(example2.result());
