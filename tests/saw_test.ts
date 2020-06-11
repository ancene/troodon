/*! *****************************************************************************
Copyright (c) the Trodoon authors. All rights reserved. MIT License.
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
