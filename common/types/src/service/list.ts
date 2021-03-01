import { Node } from "./node";
import { Any } from "../lib";

export interface ListNode<P = Any, O = Any> extends Node<P, O> {
  readonly list: Node[];
}
