import { Callback, Runner } from "@area-common/types";

export abstract class BaseRunner implements Runner<Callback> {
  readonly callback: Callback;

  parameters?: Record<string, unknown>;

  private _running = false;

  constructor(callback: Callback) {
    this.callback = callback;
  }

  get running(): boolean {
    return this._running;
  }

  start(): void {
    this._running = true;
  }

  stop(): void {
    this._running = false;
  }
}
