import { Reaction } from "../service";

export type WorkflowReaction = {
  readonly reaction: Reaction;
  readonly parameters?: Record<string, unknown>;
  readonly operatorId?: string;
}
