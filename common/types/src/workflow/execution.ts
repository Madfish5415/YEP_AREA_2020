import { AnyMap } from "../lib";

export type WorkflowExecution = {
  id: string;
  name: string;
  executionId: string;
  parameters: AnyMap<string>;
  nextId?: string;
};
