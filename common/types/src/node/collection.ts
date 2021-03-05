import { Any } from "../lib";
import { Node } from "./node";

export interface CollectionNode<P = Any, O = Any> extends Node<P, O> {
  readonly collection: Node[];
}
