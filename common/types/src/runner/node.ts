import { Node } from "../node";
import { Any } from "../lib";

export interface RunnerNode<I = Any, P = Any, O = Any> extends Node<I, O> {
  id: string;
  original: Node<P, O>;
  parameters: Record<keyof P, string>;
  condition: string;
  nextNodes: string[];
}
