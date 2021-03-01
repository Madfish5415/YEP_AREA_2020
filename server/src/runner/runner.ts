import {
  Any,
  Runner,
  RunnerAction,
  RunnerExecution,
  RunnerReaction,
  Workflow,
} from "@area-common/types";

import { ExecutionRepository, ServiceRepository } from "../repositories";
import {
  WORKFLOW_ACTION_NOT_EXISTS,
  WORKFLOW_CIRCULAR_DEPENDENCY_ERROR,
  WORKFLOW_EXECUTION_NOT_EXISTS,
} from "../constants";

const expressionRegex = /\${(.+?)}/;

export class BaseRunner implements Runner {
  actions: RunnerAction[];
  reactions: RunnerReaction[];
  executions: RunnerExecution[];

  constructor(
    actions: RunnerAction[],
    reactions: RunnerReaction[],
    executions: RunnerExecution[]
  ) {
    this.actions = actions;
    this.reactions = reactions;
    this.executions = executions;
  }

  async resolve(
    expression: string,
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
      }
    }
  }

  async run(inputs: Any): Promise<void> {
    const values = await this.actions[0].action.converter(inputs);

    for (const reaction of this.reactions) {
      if (reaction.condition) {
        reaction.condition = await this.resolve(reaction.condition, values);
      }

      for (const key in reaction.parameters) {
        reaction.parameters[key] = await this.resolve(
          reaction.parameters[key],
          values
        );
      }

      if (reaction.condition && JSON.parse(reaction.condition)) {
        await reaction.reaction.execute(reaction.parameters);
      }
    }
  }

  static fromWorkflow(
    workflow: Workflow,
    executionRepository: ExecutionRepository,
    serviceRepository: ServiceRepository
  ): BaseRunner {
    const rActions: RunnerAction[] = [];
    const rReactions: RunnerReaction[] = [];
    const rExecutions: RunnerExecution[] = [];

    for (const wAction of workflow.actions) {
      const action = serviceRepository.readAction(
        wAction.serviceId,
        wAction.actionId
      );

      if (!action) throw WORKFLOW_ACTION_NOT_EXISTS;

      rActions.push({
        id: wAction.id,
        parameters: wAction.parameters,
        action,
      });
    }

    for (const wReaction of workflow.reactions) {
      const reaction = serviceRepository.readReaction(
        wReaction.serviceId,
        wReaction.reactionId
      );

      if (!reaction) throw WORKFLOW_EXECUTION_NOT_EXISTS;

      rReactions.push({
        id: wReaction.id,
        parameters: wReaction.parameters,
        condition: wReaction.condition,
        reaction,
      });
    }

    for (const wExecution of workflow.executions || []) {
      const execution = executionRepository.read(wExecution.executionId);

      if (!execution) throw WORKFLOW_EXECUTION_NOT_EXISTS;

      rExecutions.push({
        id: wExecution.id,
        parameters: wExecution.parameters,
        execution,
      });
    }

    return new BaseRunner(rActions, rReactions, rExecutions);
  }
}
