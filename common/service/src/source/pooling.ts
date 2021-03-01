import { BaseSource } from "./source";
import { AnyObject, Event, EventType } from "@area-common/types";

export abstract class PoolingSource<
  P extends AnyObject = AnyObject
> extends BaseSource<P> {
  abstract eventIds: string[];
  abstract interval: number;

  private intervals = new Map<EventType<P>, [number, number]>();

  attach(eventType: EventType<P>): void {
    const entry = this.intervals.get(eventType) || [0, 0];

    if (entry[0] == 0) {
      entry[1] = setInterval(async () => {
        const events = await this.pool(eventType);

        for (const event of events) {
          this.notify(event);
        }
      }, this.interval);
    }

    this.intervals.set(eventType, [entry[0] + 1, entry[1]]);
  }

  detach(eventType: EventType<P>): void {
    const entry = this.intervals.get(eventType);

    if (!entry) return;

    this.intervals.set(eventType, [entry[0] - 1, entry[1]]);

    if (entry[0] - 1) return;

    clearInterval(entry[1]);

    this.intervals.delete(eventType);
  }

  abstract pool(eventType: EventType<P>): Promise<Event<P>[]>;
}
