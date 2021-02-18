import { Variable } from "./index";

export interface Operator {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly parameters?: Variable[];

  verify?(values: any): boolean;
}
