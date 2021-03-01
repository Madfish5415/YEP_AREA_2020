import { Variable } from "../variable";
import { Any } from "../lib";

export interface Action<P = Any, I = Any, O = Any> {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly eventId: string;
  readonly parametersDef: Record<keyof P, Variable>;
  readonly outputsDef: Record<keyof O, Variable>;

  converter(inputs: I): Promise<O>;
}
