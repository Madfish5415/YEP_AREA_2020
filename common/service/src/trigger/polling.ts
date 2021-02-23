import { BaseTrigger } from "./base";
import Timeout = NodeJS.Timeout;
import { AnyObject } from "@area-common/types";

export abstract class PollingTrigger<
  P extends AnyObject
> extends BaseTrigger<P> {
  abstract readonly interval: number;

  private timeout?: number;

  start(): void {
    super.start();

    this.timeout = setInterval(async () => {
      const poll = await this.poll();

      this.callback(poll);
    }, this.interval);
  }

  stop(): void {
    if (this.timeout) clearInterval(this.timeout);

    super.stop();
  }

  abstract poll(): Promise<unknown>;
}