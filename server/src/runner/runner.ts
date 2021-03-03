import {
  Runner,
  RunnerAction,
  RunnerExecution,
  RunnerReaction,
  Workflow,
} from "@area-common/types";

import { ExecutionRepository, ServiceRepository } from "../repositories";
import { WORKFLOW_ACTION_NOT_EXISTS } from "../constants";

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

      if (!reaction) throw Error(); // ! TODO: Better error handling

      rReactions.push({
        id: wReaction.id,
        parameters: wReaction.parameters,
        condition: wReaction.condition,
        reaction,
      });
    }

    for (const wExecution of workflow.executions || []) {
      const execution = executionRepository.read(wExecution.executionId);

      if (!execution) throw Error(); // ! TODO: Better error handling

      rExecutions.push({
        id: wExecution.id,
        parameters: wExecution.parameters,
        execution,
      });
    }

    return new BaseRunner(rActions, rReactions, rExecutions);
  }
}
