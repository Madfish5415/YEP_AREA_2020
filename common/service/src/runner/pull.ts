import { BaseRunner } from "./runner";

export abstract class PullRunner extends BaseRunner {
  interval?: number;

  private id?: number;

  start(): void {
    super.start();

    this.id = setInterval(async () => {
      const response = await this.pull();

      this.callback(response);
    }, this.interval);
  }

  stop(): void {
    super.stop();

    clearInterval(this.id);
  }

  abstract pull(): Promise<any>;
}
