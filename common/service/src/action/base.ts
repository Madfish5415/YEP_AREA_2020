import { Action, AnyObject, Converter, Variable } from "@area-common/types";

import { BaseTriggerConstructor } from "../trigger";

export abstract class BaseAction<
  P extends AnyObject = AnyObject,
  O extends AnyObject = AnyObject
> implements Action<P, O> {
  abstract readonly id: string;
  abstract readonly name: string;
  abstract readonly description: string;
  abstract readonly parametersDef: Record<keyof P, Variable>;
  abstract readonly outputsDef: Record<keyof O, Variable>;
  abstract readonly trigger: BaseTriggerConstructor<P>;
  abstract readonly converter: Converter<any, O>;
}
