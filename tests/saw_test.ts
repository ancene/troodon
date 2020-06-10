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

import { assertEquals, SAW, AttributeSaw } from "./mod.ts";

/**
 * Simple Additive Weighting Algorithm Test
 */
const alternatives = ["A1", "A2", "A3", "A4", "A5"];
const criterias = [
  [80, 20, 20, 20, 20],
  [40, 40, 40, 40, 40],
  [60, 60, 60, 60, 100],
  [80, 80, 80, 80, 80],
  [40, 20, 40, 60, 100],
];
const weights = [20, 20, 15, 10, 30];
const attributes = [
  AttributeSaw.COST,
  AttributeSaw.BENEFIT,
  AttributeSaw.BENEFIT,
  AttributeSaw.COST,
  AttributeSaw.BENEFIT,
];
const test = new SAW(alternatives, criterias, weights, attributes);

Deno.test("Hasil Perhitungan Topsis", () => {
  assertEquals(test.result(), ["A3", "A4", "A5", "A2", "A1"]);
});
