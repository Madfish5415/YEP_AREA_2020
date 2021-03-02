import { BasePubSub } from "@area-common/patterns";
import { AnyObject, Node } from "@area-common/types";

import { BaseTriggerNode } from "./trigger";
import Timeout = NodeJS.Timeout;

export abstract class IntervalNode<P, O> extends BaseTriggerNode<P, O> {
  abstract readonly interval: number;

  private pubSub = new BasePubSub<string>();
  private subscribers = new Map<string, [Node, string][]>();
  private intervals = new Map<string, Timeout>();

  subscribe(parameters: P, node: Node): void {
    const parametersId = JSON.stringify(parameters);
    const subscribeId = this.pubSub.subscribe(
      parametersId,
      (response: AnyObject) => node.execute(response)
    );

    const eventSubscribers = this.subscribers.get(parametersId) || [];

    eventSubscribers.push([node, subscribeId]);

    this.subscribers.set(parametersId, eventSubscribers);

    if (this.intervals.has(parametersId)) return;

    const intervalId = global.setInterval(async () => {
      const response = await this.execute(parameters);

      if (response instanceof Array) {
        for (const item of response) {
          this.pubSub.publish(parametersId, item);
        }
      } else {
        this.pubSub.publish(parametersId, response);
      }
    }, this.interval);

    this.intervals.set(parametersId, intervalId);
  }

  unsubscribe(parameters: P, node: Node): void {
    const parametersId = JSON.stringify(parameters);

    const eventSubscribers = this.subscribers.get(parametersId);

    if (!eventSubscribers) return;

    const index = eventSubscribers.findIndex(
      (subscriber) => subscriber[0] === node
    );

    if (index === -1) return;

    this.pubSub.unsubscribe(parametersId, eventSubscribers[index][1]);

    eventSubscribers.splice(index, 1);

    const subscribers = this.pubSub.subscribers.get(parametersId);

    if (!subscribers) return;
    if (subscribers.length) return;

    const id = this.intervals.get(parametersId);

    if (id) {
      global.clearInterval(id);
    }

    this.intervals.delete(parametersId);
  }
}
