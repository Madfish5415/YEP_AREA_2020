import { Variable } from "../variable";
import { Any } from "../lib";
import { Node } from "./node";

export interface SingletonNode<P = Any, O = Any> extends Node<P, O> {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly parametersDef?: Record<keyof P, Variable>;
  readonly outputsDef?: Record<keyof O, Variable>;
}
