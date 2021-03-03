import { AnyObject } from "../lib";
import { EventType } from "./type";

export type Event<P extends AnyObject = AnyObject> = {
  type: EventType<P>;
  data: AnyObject;
};
