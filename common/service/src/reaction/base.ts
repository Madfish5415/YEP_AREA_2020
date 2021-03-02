import { AnyObject, Reaction, Variable } from "@area-common/types";

export abstract class BaseReaction<P extends AnyObject = AnyObject>
  implements Reaction<P> {
  abstract readonly id: string;
  abstract readonly name: string;
  abstract readonly description: string;
  abstract readonly parametersDef: Record<keyof P, Variable>;

  abstract execute(parameters: P): Promise<void>;
}
