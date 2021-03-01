import { Variable } from "../variable";
import { Any } from "../lib";

export interface Reaction<P = Any> {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly parametersDef: Record<keyof P, Variable>;

  execute(parameters: P): Promise<void>;
}
