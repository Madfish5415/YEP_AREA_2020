import { Any } from "../lib";

export interface Listener<T = Any> {
  subscribers: CallableFunction[];

  notify(value: T): void;

  subscribe(callback: CallableFunction): void;

  unsubscribe(callback: CallableFunction): void;
}
