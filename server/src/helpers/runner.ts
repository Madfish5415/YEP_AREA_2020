import { RunnerExecution } from "@area-common/types";
import {
  WORKFLOW_CIRCULAR_DEPENDENCY_ERROR,
  WORKFLOW_EXECUTION_NOT_EXISTS,
} from "../constants";
import { flatObject } from "../utilities";

const expressionRegex = /\${(.+?)}/;

async function runnerResolve(
  expression: string,
  executions: RunnerExecution[],
  values: Record<string, string> = {},
  visited: Record<string, boolean> = {}
): Promise<string> {
  const matchesArr = expression.matchAll(expressionRegex);

  for (const matches of matchesArr) {
    if (!values[matches[1]]) {
      if (matches[1] in visited) {
        throw WORKFLOW_CIRCULAR_DEPENDENCY_ERROR;
      }

      visited[matches[1]] = true;

      const [id] = matches[1].split(".");

      const execution = executions.find((execution) => execution.id === id);

      if (!execution) throw WORKFLOW_EXECUTION_NOT_EXISTS;

      for (const key in execution.parameters) {
        execution.parameters[key] = await runnerResolve(
          execution.parameters[key],
          executions,
          values,
          visited
        );
      }

      const result = await execution.execution.execute(execution.parameters);
      const flatten = flatObject(result);

      for (const key in flatten) {
        values[`${id}.${key}`] = flatten[key] as string;
      }
    }

    expression.replace(matches[0], values[matches[1]]);
  }

  return expression;
}
