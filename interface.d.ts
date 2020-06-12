export interface IResult {
  error: boolean;
  length: number;
  result: Array<number>;
}

export enum Attribute {
  BENEFIT,
  COST,
}
