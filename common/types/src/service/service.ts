import { Action } from "./action";
import { Reaction } from "./reaction";
import { Source } from "../source";

export interface Service {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly version: string;
  readonly actions: Action[];
  readonly reactions: Reaction[];
  readonly sources: Source[];
}
