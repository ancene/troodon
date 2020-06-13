/*! *****************************************************************************
Copyright (c) the Trodoon authors. All rights reserved. MIT License.
***************************************************************************** */

import { IResult } from "./../interfaces.ts";

export const isPrime = (value: number): boolean => {
  if (!Number.isInteger(value) || value == 1 || value < 1) return false;

  if (value == 2) return true;

  for (let i = 2; i < value; i++) {
    if (value % i == 0) return false;
  }

  return true;
};

export const listPrimes = (value: number): IResult => {
  let result: IResult;
  const temp: Array<number> = [];

  if (!Number.isInteger(value) || value == 1 || value < 1) {
    return (result = {
      error: true,
      length: 0,
      result: [],
    });
  }

  for (let i = 2; i <= value; i++) {
    let isPrime: boolean = true;
    for (let j = 2; j < i; j++) {
      if (i % j == 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) temp.push(i);
  }

  return (result = {
    error: false,
    length: temp.length,
    result: temp,
  });
};
