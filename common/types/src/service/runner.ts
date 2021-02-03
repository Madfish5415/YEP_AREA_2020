export interface Runner<T> {
  readonly callback: T;
  readonly running: boolean;

  parameters?: Record<string, unknown>;

  start(): void;

  stop(): void;
}

export interface RunnerConstructor<T> {
  new (callback: T): Runner<T>;
}
