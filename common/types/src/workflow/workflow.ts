import { WorkflowNode } from "./node";

export type Workflow = {
  readonly userId: string;
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly active: boolean;
  readonly nodes: WorkflowNode[];
  readonly starters: string[];
};
