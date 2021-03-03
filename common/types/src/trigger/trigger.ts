export interface Trigger<P = any> {
  readonly callback: CallableFunction;
  readonly running: boolean;
  readonly parameters: P;

  start(): void;

  stop(): void;
}

export interface TriggerConstructor<P = any> {
  new (callback: CallableFunction, parameters: P): Trigger<P>;
}
