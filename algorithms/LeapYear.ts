/*! *****************************************************************************
Copyright (c) the Trodoon authors. All rights reserved. MIT License.
***************************************************************************** */

import { IResult } from "./../interface.d.ts";

const isLeapYear = (year: number): boolean =>
  !(year % 4 || (!(year % 100) && year % 400));

const listLeapYears = (s: number, e: number): IResult => {
  let result: IResult;
  const temp: Array<number> = [];

  if (s < 1 || !Number.isInteger(s) || !Number.isInteger(e)) {
    return (result = {
      error: true,
      length: 0,
      result: [],
    });
  }
  console.time("T1");
  for (let i = s; i <= e; i++) {
    if (isLeapYear(i)) temp.push(i);
  }
  console.timeEnd("T1");
  return (result = {
    error: false,
    length: temp.length,
    result: temp,
  });
};

export { isLeapYear, listLeapYears };
