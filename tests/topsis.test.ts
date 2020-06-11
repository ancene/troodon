/*! *****************************************************************************
Copyright (c) the Trodoon authors. All rights reserved. MIT License.
***************************************************************************** */

import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Topsis } from "./../mod.ts";

/**
 * Topsis Algorithm Test
 */
const alternatif = ["Teacher A", "Teacher B", "Teacher C"];
const kriteria = [
  [80, 75, 80, 90, 85, 70, 65, 75],

  [90, 75, 85, 70, 80, 65, 80, 75],

  [75, 80, 70, 75, 85, 65, 70, 85],
];
const bobot = [10, 10, 20, 10, 15, 10, 10, 15];
const tes = new Topsis(alternatif, kriteria, bobot).result();

Deno.test(
  "Topsis: must be return ['Teacher B', 'Teacher A', 'Teacher C']",
  () => {
    assertEquals(tes, ["Teacher B", "Teacher A", "Teacher C"]);
  }
);
