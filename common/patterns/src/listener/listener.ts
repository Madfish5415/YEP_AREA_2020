import { Listener } from "@area-common/types";

export class BaseListener<T = any> implements Listener<T> {
  subscribers: CallableFunction[] = [];

  notify(value: T): void {
    for (const subscriber of this.subscribers) {
      subscriber(value);
    }
  }

  subscribe(callback: CallableFunction): void {
    this.subscribers.push(callback);
  }

  unsubscribe(callback: CallableFunction): void {
    const index = this.subscribers.findIndex(
      (subscriber) => subscriber === callback
    );

    this.subscribers.splice(index, 1);
  }
}
