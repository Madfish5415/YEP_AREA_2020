import { Any, Node, Variable } from "@area-common/types";

export abstract class BaseNode<P = Any, O = Any> implements Node<P, O> {
  abstract readonly id: string;
  abstract readonly name: string;
  abstract readonly description: string;
  abstract readonly parametersDef?: Record<keyof P, Variable>;
  abstract readonly outputsDef?: Record<keyof O, Variable>;

  abstract execute(parameters?: P): Promise<O>;
}
