import { AnyObject, Trigger, TriggerConstructor } from "@area-common/types";

export abstract class BaseTrigger<P extends AnyObject = AnyObject>
  implements Trigger<P> {
  readonly callback: CallableFunction;
  readonly parameters: P;

  private _running = false;

  constructor(callback: CallableFunction, parameters: P) {
    this.callback = callback;
    this.parameters = parameters;
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

export type BaseTriggerConstructor<P extends AnyObject> = TriggerConstructor<P>;
