import { AnyMap } from "../lib";
import { Action } from "../service";

export type RunnerAction = {
  id: string;
  action: Action;
  parameters: AnyMap<string>;
};
