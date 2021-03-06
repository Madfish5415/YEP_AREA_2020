import { Any } from "../lib";

export interface PubSub<E = Any, T = Any> {
  publish(event: E, value: T): void;

  subscribe(event: E, callback: CallableFunction): string;

  unsubscribe(event: E, id: string): void;
}
