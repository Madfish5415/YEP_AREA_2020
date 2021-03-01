import { Variable } from "../variable";
import { Any } from "../lib";

export interface Execution<P = Any, O = Any> {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly parametersDef: Record<keyof P, Variable>;
  readonly outputsDef: Record<keyof O, Variable>;

  execute(parameters: P): Promise<O>;
}
