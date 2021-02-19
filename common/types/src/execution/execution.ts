import { Variable } from "../variable";

export interface Execution<P = any, O = any> {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly parametersDef: Record<keyof P, Variable>;
  readonly outputsDef: Record<keyof O, Variable>;

  execute(parameters: P, inputs: unknown): Promise<O>;
}
