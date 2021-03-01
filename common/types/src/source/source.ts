import { Listener } from "../listener";
import { Any } from "../lib";

export interface Source<T extends Any> extends Listener<T> {
  eventIds: string[];
}
