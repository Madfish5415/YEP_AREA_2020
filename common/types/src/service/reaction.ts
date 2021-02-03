import { Variable } from "./variable";

export interface Reaction {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly parameters: Variable[];

  send(parameters: Record<string, unknown>): Promise<void>;
}
