import { PubSub } from "@area-common/types";
import { v4 } from "uuid";

export class BasePubSub<E = any, T = any> implements PubSub<E, T> {
  subscribers = new Map<E, [string, CallableFunction][]>();

  publish(event: E, value: T): void {
    const eventSubscribers = this.subscribers.get(event) || [];

    for (const subscriber of eventSubscribers) {
      subscriber[1](value);
    }
  }

  subscribe(event: E, callback: CallableFunction): string {
    const id = v4();
    const eventSubscribers = this.subscribers.get(event) || [];

    eventSubscribers.push([id, callback]);

    this.subscribers.set(event, eventSubscribers);

    return id;
  }

  unsubscribe(event: E, id: string): void {
    const eventSubscribers = this.subscribers.get(event);

    if (!eventSubscribers) return;

    const index = eventSubscribers.findIndex(
      (subscriber) => subscriber[0] === id
    );

    if (index === -1) return;

    eventSubscribers.splice(index, 1);

    this.subscribers.set(event, eventSubscribers);
  }
}
