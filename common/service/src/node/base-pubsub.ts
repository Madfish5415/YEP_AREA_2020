import { Any, Node, PubSubNode } from "@area-common/types";
import { BaseListNode } from "./base-list";
import { BasePubSub } from "@area-common/patterns";

export abstract class BasePubSubNode<P = Any, O = Any>
  extends BaseListNode<P, O>
  implements PubSubNode<P, O> {
  protected pubSub = new BasePubSub();

  subscribe(parameters: P, node: Node): void {
    this.pubSub.subscribe(parameters, node.execute);
  }

  unsubscribe(parameters: P, node: Node): void {
    this.pubSub.unsubscribe(parameters, node.execute);
  }
}
