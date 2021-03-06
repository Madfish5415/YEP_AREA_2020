import { Node } from "../node";

export interface Runner {
  readonly nodes: Node[];

  start(): void;

  stop(): void;
}
