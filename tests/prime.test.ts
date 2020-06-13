/*! *****************************************************************************
Copyright (c) the Trodoon authors. All rights reserved. MIT License.
***************************************************************************** */

import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { isPrime, listPrimes } from "./../algorithms/prime_number.ts";

/**
 * Prime Number
 */

Deno.test("isPrime: must be return true", () => {
  assertEquals(isPrime(2), true);
});

Deno.test("isPrime: must be return false", () => {
  assertEquals(isPrime(1), false);
});

Deno.test("isPrime: must be return true", () => {
  assertEquals(isPrime(300), false);
});

/**
 * List Primes Number
 */
Deno.test("listPrimes: must be return {false,2,[2]}", () => {
  assertEquals(listPrimes(2), {
    error: false,
    length: 1,
    result: [2],
  });
});

Deno.test("listPrimes: must be return {true,0,[]}", () => {
  assertEquals(listPrimes(1), {
    error: true,
    length: 0,
    result: [],
  });
});

Deno.test("listPrimes: must be return {false,3,[2,3,5]}", () => {
  assertEquals(listPrimes(5), {
    error: false,
    length: 3,
    result: [2, 3, 5],
  });
});
