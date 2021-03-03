import { WorkflowAction } from "./action";
import { WorkflowExecution } from "./execution";
import { WorkflowReaction } from "./reaction";

export type Workflow = {
  readonly userId: string;
  readonly id: string;
  readonly name: string;
  isActive: boolean;
  readonly action: WorkflowAction;
  readonly reactions: WorkflowReaction[];
  readonly executions?: WorkflowExecution[];
};
