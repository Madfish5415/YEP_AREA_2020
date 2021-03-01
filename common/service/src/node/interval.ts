import { Node, Variable } from "@area-common/types";
import { BasePubSubNode } from "./base-pubsub";

export abstract class IntervalNode<P, O> extends BasePubSubNode<P, O> {
  abstract readonly id: string;
  abstract readonly name: string;
  abstract readonly description: string;
  abstract readonly parametersDef?: Record<keyof P, Variable>;
  abstract readonly outputsDef?: Record<keyof O, Variable>;
  abstract readonly interval: number;

  private callbacks = new Map<P, number>();

  subscribe(parameters: P, node: Node): void {
    super.subscribe(parameters, node);

    if (this.callbacks.has(parameters)) return;

    const id = setInterval(async () => {
      const response = await this.execute(parameters);

      this.pubSub.publish(parameters, response);
    }, this.interval);

    this.callbacks.set(parameters, id);
  }

  unsubscribe(parameters: P, node: Node): void {
    super.unsubscribe(parameters, node);

    if (this.pubSub.subscribers.get(parameters)?.length) return;

    const id = this.callbacks.get(parameters);

    clearInterval(id);

    this.callbacks.delete(parameters);
  }
}
