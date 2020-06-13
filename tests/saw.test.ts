/*! *****************************************************************************
Copyright (c) the Trodoon authors. All rights reserved. MIT License.
***************************************************************************** */

import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { saw } from "./../algorithms/saw.ts";
import { Attribute } from "./../enums.ts";

/**
 * Simple Additive Weighting Algorithm Test
 */
Deno.test("saw: must be return ['A3', 'A4', 'A5', 'A2', 'A1']", () => {
  const alternatives = ["A1", "A2", "A3", "A4", "A5"];
  const criterias = [
    [80, 20, 20, 20, 20],
    [40, 40, 40, 40, 40],
    [60, 60, 60, 60, 100],
    [80, 80, 80, 80, 80],
    [40, 20, 40, 60, 100],
  ];
  const weights = [20, 20, 15, 10, 35];
  const attributes = [
    Attribute.COST,
    Attribute.BENEFIT,
    Attribute.BENEFIT,
    Attribute.COST,
    Attribute.BENEFIT,
  ];
  const test = saw(alternatives, criterias, weights, attributes);
  assertEquals(test, ["A3", "A4", "A5", "A2", "A1"]);
});
