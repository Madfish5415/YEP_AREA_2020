import { AnyObject } from "../lib";

export type EventType<P extends AnyObject = AnyObject> = {
  id: string;
  parameters: P;
};
