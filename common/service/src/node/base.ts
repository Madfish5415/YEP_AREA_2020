import { Any, SingletonNode, Variable } from "@area-common/types";

export abstract class BaseNode<P = Any, O = Any>
  implements SingletonNode<P, O> {
  abstract readonly id: string;
  abstract readonly name: string;
  abstract readonly description: string;
  abstract readonly label: string;
  abstract readonly parametersDef?: Record<keyof P, Variable>;
  abstract readonly outputsDef?: Record<keyof O, Variable>;
  readonly credentials?: boolean = undefined;
  readonly forward?: boolean = undefined;

  abstract execute(parameters?: P): Promise<O | O[]>;

  toJSON(): Any {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      label: this.label,
      parametersDef: this.parametersDef,
      outputsDef: this.outputsDef,
      credentials: this.credentials,
      forward: this.forward,
    };
  }
}
