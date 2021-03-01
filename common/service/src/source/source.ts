import { AnyObject, Event, Source } from "@area-common/types";
import { BaseListener } from "../../../patterns";

export abstract class BaseSource<P extends AnyObject = AnyObject>
  extends BaseListener<Event<P>>
  implements Source<Event<P>> {
  abstract eventIds: string[];
}
