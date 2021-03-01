import { Any } from "../lib";
import { Node } from "./node";
import { ListNode } from "./list";

export interface PubSubNode<P = Any, O = Any> extends ListNode<P, O> {
  subscribe(parameters: P, node: Node): void;

  unsubscribe(parameters: P, node: Node): void;
}
