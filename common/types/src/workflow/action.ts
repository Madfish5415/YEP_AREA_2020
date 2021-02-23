import { AnyMap } from "../lib";

export type WorkflowAction = {
  id: string;
  name: string;
  serviceId: string;
  actionId: string;
  parameters: AnyMap<string>;
};
