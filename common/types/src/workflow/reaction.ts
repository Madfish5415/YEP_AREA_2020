import { AnyMap } from "../lib";

export type WorkflowReaction = {
  id: string;
  name: string;
  serviceId: string;
  reactionId: string;
  parameters: AnyMap<string>;
  nextId?: string;
};
