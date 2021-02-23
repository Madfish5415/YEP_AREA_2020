import { WorkflowAction } from "./action";
import { WorkflowExecution } from "./execution";
import { WorkflowReaction } from "./reaction";

export type Workflow = {
  readonly userId: string;
  readonly id: string;
  readonly name: string;
<<<<<<< HEAD
  readonly isActive: boolean;
  readonly action?: WorkflowAction;
  readonly reactions?: WorkflowReaction[];
  readonly operators?: WorkflowOperator[];
  readonly runner?: Runner<Callback>;
}
=======
  readonly description: string;
  readonly active: boolean;
  readonly actions: WorkflowAction[];
  readonly reactions: WorkflowReaction[];
  readonly executions?: WorkflowExecution[];
};
>>>>>>> wip/server
