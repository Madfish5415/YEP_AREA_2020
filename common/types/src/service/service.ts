import { SingletonNode } from "../node";

export interface Service {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly version: string;
  readonly nodes: SingletonNode[];
}
