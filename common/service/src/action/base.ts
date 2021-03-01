import { Action, Any, AnyObject, Variable } from "@area-common/types";

export abstract class BaseAction<
  P extends AnyObject = AnyObject,
  O extends AnyObject = AnyObject
> implements Action<P, O> {
  abstract readonly id: string;
  abstract readonly name: string;
  abstract readonly description: string;
  abstract readonly eventId: string;
  abstract readonly parametersDef: Record<keyof P, Variable>;
  abstract readonly outputsDef: Record<keyof O, Variable>;

  abstract converter(inputs: Any): Promise<O>;
}
