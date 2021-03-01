import { BaseSource } from "./source";
import { AnyObject, Event } from "@area-common/types";

export abstract class WebhookSource<
  P extends AnyObject = AnyObject
> extends BaseSource<P> {
  abstract eventIds: string[];

  abstract hook(response: Response): Promise<Event<P>>;
}
