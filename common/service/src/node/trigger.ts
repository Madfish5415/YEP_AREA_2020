import { Any, Node, TriggerNode } from "@area-common/types";
import { BaseNode } from "./base";

export abstract class BaseTriggerNode<P = Any, O = Any>
  extends BaseNode<P, O>
  implements TriggerNode<P, O> {
  abstract subscribe(parameters: P, node: Node): void;

  abstract unsubscribe(parameters: P, node: Node): void;
}
