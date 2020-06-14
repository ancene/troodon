/*! *****************************************************************************
Copyright (c) the Trodoon authors. All rights reserved. MIT License.
***************************************************************************** */

export const matrix = (matrix: Array<Array<number>>) => {
  const rows: Array<Array<number>> = [];
  const columns: Array<Array<number>> = [];

  matrix.forEach((values, indexes) => {
    let temp: Array<number> = [];
    rows.push(values);
    values.forEach((value, index) => temp.push(matrix[index][indexes]));
    columns.push(temp);
  });

  return { rows, columns };
};
