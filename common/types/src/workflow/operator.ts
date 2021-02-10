import { Operator } from "../service";

export type WorkflowOperator = {
  readonly id: string;
  readonly operator: Operator;
  readonly parameters?: Record<string, unknown>;
}
