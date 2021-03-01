import { PubSub } from "@area-common/types";

export class BasePubSub<E = any, T = any> implements PubSub<E, T> {
  subscribers = new Map<E, CallableFunction[]>();

  publish(event: E, value: T): void {
    const eventSubscribers = this.subscribers.get(event) || [];

    for (const subscriber of eventSubscribers) {
      subscriber(value);
    }
  }

  subscribe(event: E, callback: CallableFunction): void {
    const eventSubscribers = this.subscribers.get(event) || [];

    eventSubscribers.push(callback);

    this.subscribers.set(event, eventSubscribers);
  }

  unsubscribe(event: E, callback: CallableFunction): void {
    const eventSubscribers = this.subscribers.get(event);

    if (!eventSubscribers) return;

    const index = eventSubscribers.findIndex(
      (subscriber) => subscriber === callback
    );

    eventSubscribers.splice(index, 1);

    this.subscribers.set(event, eventSubscribers);
  }
}
