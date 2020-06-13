/*! *****************************************************************************
Copyright (c) the Trodoon authors. All rights reserved. MIT License.
***************************************************************************** */

import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { wpm } from "./../algorithms/wpm.ts";
import { Attribute } from "./../enums.ts";

const alternatives = [
  "Sumber",
  "Sariharjo",
  "Sinduharjo",
  "Windusari",
  "Mranggen",
];
const criterias = [
  [5, 5, 1000000, 20, 5],
  [5, 5, 800000, 22, 5],
  [5, 3, 850000, 25, 5],
  [3, 5, 900000, 23, 5],
  [5, 3, 1050000, 24, 5],
];
const weights = [5, 4, 4, 3, 5];
const attributes = [
  Attribute.BENEFIT,
  Attribute.BENEFIT,
  Attribute.COST,
  Attribute.BENEFIT,
  Attribute.BENEFIT,
];

/**
 * Weighted Product Model Algorithm Test
 */
Deno.test("wpm: must be return ['Sar', 'Sum', 'Sin', 'Mra', 'Win']", () => {
  const test = wpm(alternatives, criterias, weights, attributes);
  assertEquals(test, [
    "Sariharjo",
    "Sumber",
    "Sinduharjo",
    "Mranggen",
    "Windusari",
  ]);
});
