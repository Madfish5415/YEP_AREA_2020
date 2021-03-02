import { RunnerAction } from "./action";
import { RunnerExecution } from "./execution";
import { RunnerReaction } from "./reaction";

export interface Runner {
  actions: RunnerAction[];
  reactions: RunnerReaction[];
  executions: RunnerExecution[];
}
