import { Workflow } from "@area-common/types";

import {
  ExecutionRepository,
  ServiceRepository,
  WorkflowRepository,
} from "../repositories";
import { BaseRunner } from "../runner/runner";

export class RunnerManager {
  executionWorkflow: ExecutionRepository;
  serviceWorkflow: ServiceRepository;
  workflowRepository: WorkflowRepository;

  constructor(
    executionWorkflow: ExecutionRepository,
    serviceWorkflow: ServiceRepository,
    workflowRepository: WorkflowRepository
  ) {
    this.executionWorkflow = executionWorkflow;
    this.serviceWorkflow = serviceWorkflow;
    this.workflowRepository = workflowRepository;
  }

  async create(workflow: Workflow): Promise<void> {
    await this.workflowRepository.create(workflow);

    const runner = BaseRunner.fromWorkflow(
      workflow,
      this.executionWorkflow,
      this.serviceWorkflow
    );
  }

  async update(
    id: string,
    partial: Partial<Workflow>
  ): Promise<Workflow | null> {
    const workflow = await this.workflowRepository.update(id, partial);

    if (!workflow) throw Error(); // ! TODO: Better error handling

    const runner = BaseRunner.fromWorkflow(
      workflow,
      this.executionWorkflow,
      this.serviceWorkflow
    );

    return workflow;
  }

  async delete(id: string): Promise<void> {
    await this.workflowRepository.delete(id);
  }
}
