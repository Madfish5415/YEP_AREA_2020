import { AnyMap } from "../lib";

export type Node = {
  id: string;
  name: string;
  parameters: AnyMap<string>;
  nextNodeId?: string;
};
