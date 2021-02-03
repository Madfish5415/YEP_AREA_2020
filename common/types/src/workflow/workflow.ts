import { Callback, Runner } from "../service";
import { WorkflowAction } from "./action";
import { WorkflowReaction } from "./reaction";
import { WorkflowOperator } from "./operator";

export interface Workflow {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly action: WorkflowAction;
  readonly reactions: WorkflowReaction[];
  readonly operators: WorkflowOperator[];
  readonly runner: Runner<Callback>;
}
