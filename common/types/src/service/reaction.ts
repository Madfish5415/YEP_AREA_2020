import { Variable } from "../variable";

export interface Reaction<P = any> {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly parametersDef: Record<keyof P, Variable>;

  execute(parameters: P): Promise<void>;
}
