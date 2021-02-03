import {
  Workflow,
  WorkflowAction,
  WorkflowOperator,
  WorkflowReaction,
} from "@area-common/types";
import workflowsJson from "../data/workflows.json";
import { ServiceRepository } from "./service";
import { BaseWorkflow } from "../workflows/workflow";
import { OperatorRepository } from "./operator";

function fromJSON(
  json: any,
  operatorRepository: OperatorRepository,
  serviceRepository: ServiceRepository
): BaseWorkflow {
  const action: WorkflowAction = {
    action: serviceRepository.readAction(json.action.service, json.action.id)!,
    parameters: json.action.parameters,
  };

  const reactions: WorkflowReaction[] = json.reactions.map(
    (reactionJson: any): WorkflowReaction => {
      return {
        reaction: serviceRepository.readReaction(
          reactionJson.service,
          reactionJson.id
        )!,
        parameters: reactionJson.parameters,
        operatorId: reactionJson.operator,
      };
    }
  );

  const operators: WorkflowOperator[] = json.operators.map(
    (operatorJson: any): WorkflowOperator => {
      return {
        id: operatorJson.id,
        operator: operatorRepository.read(operatorJson.type)!,
        parameters: operatorJson.parameters,
      };
    }
  );

  if (!action || !reactions.length) {
    throw new Error();
  }

  return new BaseWorkflow(
    json.id,
    json.name,
    json.description,
    action,
    reactions,
    operators
  );
}

export class WorkflowRepository {
  operatorRepository: OperatorRepository;
  serviceRepository: ServiceRepository;

  private readonly workflows: Workflow[];

  constructor(
    operatorRepository: OperatorRepository,
    serviceRepository: ServiceRepository
  ) {
    this.operatorRepository = operatorRepository;
    this.serviceRepository = serviceRepository;

    this.workflows = workflowsJson.map((workflowJson) =>
      fromJSON(workflowJson, this.operatorRepository, this.serviceRepository)
    );
  }

  list(): Workflow[] {
    return this.workflows;
  }

  create(workflow: Workflow) {
    return this.workflows.push(workflow);
  }

  read(id: string): Workflow | undefined {
    return this.workflows.find((workflow) => workflow.id === id);
  }

  update(id: string, values: Partial<Workflow>) {
    const index = this.workflows.findIndex((workflow) => workflow.id === id);

    this.workflows[index] = { ...this.workflows[index], ...values };
  }

  delete(id: string) {
    const index = this.workflows.findIndex((workflow) => workflow.id === id);

    this.workflows.slice(index, 1);
  }
}
