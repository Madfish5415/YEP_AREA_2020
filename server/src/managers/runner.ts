import {
  AnyMap,
  AnyObject,
  Runner,
  RunnerExecution,
  Trigger,
  Workflow,
} from "@area-common/types";

import {
  ExecutionRepository,
  ServiceRepository,
  WorkflowRepository,
} from "../repositories";
import { BaseRunner } from "../runner/runner";
import { flatObject } from "../utilities";
import { WORKFLOW_CIRCULAR_DEPENDENCY_ERROR } from "../constants";

const expressionRegex = /\${(.+?)}/;

async function resolve(
  expression: string,
  rExecutions: RunnerExecution[],
  values: Record<string, string>,
  visited: string[]
): Promise<string> {
  const matchesArr = expression.matchAll(expressionRegex);

  for (const matches of matchesArr) {
    if (!values[matches[1]]) {
      if (visited.find((item) => item === matches[1])) {
        throw WORKFLOW_CIRCULAR_DEPENDENCY_ERROR;
      }

      visited.push(matches[1]);

      const [id] = matches[1].split(".");

      const rExecution = rExecutions.find((rExecution) => rExecution.id === id);

      if (!rExecution) throw Error(); // ! TODO: Better error handling

      for (const key in rExecution.parameters) {
        rExecution.parameters[key] = await resolve(
          rExecution.parameters[key],
          rExecutions,
          values,
          visited
        );
      }

      const result = await rExecution.execution.execute(
        rExecution.parameters,
        values
      ); // { result: false, out: 10 }
      const flatten = flatObject(result);

      for (const key in flatten) {
        values[`${id}.${key}`] = flatten[key] as string;
      }
    }

    expression.replace(matches[0], values[matches[1]]);
  }

  return expression;
}

export class RunnerManager {
  executionWorkflow: ExecutionRepository;
  serviceWorkflow: ServiceRepository;
  workflowRepository: WorkflowRepository;

  private triggers: Record<string, Trigger[]> = {};

  constructor(
    executionWorkflow: ExecutionRepository,
    serviceWorkflow: ServiceRepository,
    workflowRepository: WorkflowRepository
  ) {
    this.executionWorkflow = executionWorkflow;
    this.serviceWorkflow = serviceWorkflow;
    this.workflowRepository = workflowRepository;
  }

  async createTriggers(runner: Runner): Promise<Trigger<unknown>[]> {
    const triggers: Trigger[] = [];
    const values: AnyMap<string> = {};

    const callback = async (inputs: AnyObject) => {
      for (const rReaction of runner.reactions) {
        if (rReaction.condition) {
          rReaction.condition = await resolve(
            rReaction.condition,
            runner.executions,
            values,
            []
          );
        }

        for (const key in rReaction.parameters) {
          rReaction.parameters[key] = await resolve(
            rReaction.parameters[key],
            runner.executions,
            values,
            []
          );
        }

        if (rReaction.condition && JSON.parse(rReaction.condition)) {
          await rReaction.reaction.execute(rReaction.parameters);
        }
      }
    };

    for (const rAction of runner.actions) {
      const trigger = new rAction.action.trigger(callback, rAction.parameters);

      triggers.push(trigger);
    }

    return triggers;
  }

  async create(workflow: Workflow): Promise<void> {
    await this.workflowRepository.create(workflow);

    const runner = BaseRunner.fromWorkflow(
      workflow,
      this.executionWorkflow,
      this.serviceWorkflow
    );

    this.triggers[workflow.id] = await this.createTriggers(runner);

    this.triggers[workflow.id].forEach((trigger) => trigger.start());
  }

  async update(
    id: string,
    partial: Partial<Workflow>
  ): Promise<Workflow | null> {
    const workflow = await this.workflowRepository.update(id, partial);

    if (!workflow) throw Error(); // ! TODO: Better error handling

    this.triggers[workflow.id].forEach((trigger) => trigger.stop());

    const runner = BaseRunner.fromWorkflow(
      workflow,
      this.executionWorkflow,
      this.serviceWorkflow
    );

    this.triggers[workflow.id] = await this.createTriggers(runner);

    this.triggers[workflow.id].forEach((trigger) => trigger.start());

    return workflow;
  }

  async delete(id: string): Promise<void> {
    await this.workflowRepository.delete(id);

    this.triggers[id].forEach((trigger) => trigger.stop());

    delete this.triggers[id];
  }
}
