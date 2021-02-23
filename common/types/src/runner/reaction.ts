import { AnyMap } from "../lib";
import { Reaction } from "../service";

export type RunnerReaction = {
  id: string;
  reaction: Reaction;
  parameters: AnyMap<string>;
  condition: string;
};
