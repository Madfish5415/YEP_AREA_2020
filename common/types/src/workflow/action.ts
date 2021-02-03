import { Action } from "../service";

export type WorkflowAction = {
  readonly action: Action;
  readonly parameters?: Record<string, unknown>;
}
