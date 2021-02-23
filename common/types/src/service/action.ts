import { Converter } from "../converter";
import { TriggerConstructor } from "../trigger";
import { Variable } from "../variable";

export interface Action<P = any, O = any> {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly parametersDef: Record<keyof P, Variable>;
  readonly outputsDef: Record<keyof O, Variable>;
  readonly trigger: TriggerConstructor<P>;
  readonly converter: Converter<any, O>;
}
