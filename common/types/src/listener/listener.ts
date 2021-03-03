export interface Listener<T> {
  notify(value: T): void;

  subscribe(callback: CallableFunction): void;

  unsubscribe(callback: CallableFunction): void;
}
