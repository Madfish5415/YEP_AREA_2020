import { Any } from "../lib";
import { Variable } from "../variable";
import { Node } from "./node";

export interface SingletonNode<P = Any, O = Any> extends Node<P, O> {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly label: string;
  readonly parametersDef?: Record<keyof P, Variable>;
  readonly outputsDef?: Record<keyof O, Variable>;
  readonly credentials?: boolean;
  readonly forward?: boolean;
}
