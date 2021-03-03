import { Execution } from "../execution";
import { AnyMap } from "../lib";

export type RunnerExecution = {
  id: string;
  execution: Execution;
  parameters: AnyMap<string>;
};
