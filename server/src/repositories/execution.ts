import { Execution } from "@area-common/types";

export class ExecutionRepository {
  executions: Execution[];

  constructor(executions: Execution[]) {
    this.executions = executions;
  }

  read(id: string): Execution | undefined {
    return this.executions.find((execution) => execution.id === id);
  }
}
