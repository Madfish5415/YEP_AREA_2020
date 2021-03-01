import { Any } from "../lib";

export interface PubSub<E = Any, T = Any> {
  subscribers: Map<E, CallableFunction[]>;

  publish(event: E, value: T): void;

  subscribe(event: E, callback: CallableFunction): void;

  unsubscribe(event: E, callback: CallableFunction): void;
}
