import { Any } from "../lib";
import { Node } from "./node";

export interface TriggerNode<P = Any, O = Any> extends Node<P, O> {
  subscribe(parameters: P, node: Node): void;

  unsubscribe(parameters: P, node: Node): void;
}
