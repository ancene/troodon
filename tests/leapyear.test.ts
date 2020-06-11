/*! *****************************************************************************
Copyright (c) the Trodoon authors. All rights reserved. MIT License.
***************************************************************************** */

import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { isLeapYear, listLeapYears } from "./../mod.ts";

/**
 * is Leap Year
 */
Deno.test("isLeapYear: must be return true", () => {
  assertEquals(isLeapYear(4), true);
});

Deno.test("isLeapYear: must be return false", () => {
  assertEquals(isLeapYear(1), false);
});

Deno.test("isLeapYear: must be return true", () => {
  assertEquals(isLeapYear(0.1), false);
});

/**
 * List Leap Years
 */
Deno.test("listLeapYears: must be return {true,0,[]}", () => {
  assertEquals(listLeapYears(0, 1), {
    error: true,
    length: 0,
    result: [],
  });
});

Deno.test("listLeapYears: must be return {false,3,[12, 16, 20]}", () => {
  assertEquals(listLeapYears(10, 20), {
    error: false,
    length: 3,
    result: [12, 16, 20],
  });
});
