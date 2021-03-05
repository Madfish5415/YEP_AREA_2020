import { Runner, Workflow } from "@area-common/types";

import { WORKFLOW_NOT_EXISTS } from "../constants";
import {
  CredentialRepository,
  ServiceRepository,
  WorkflowRepository,
} from "../repositories";
import { BaseRunner } from "../runner";

export class RunnerManager {
  credentialRepository: CredentialRepository;
  serviceRepository: ServiceRepository;
  workflowRepository: WorkflowRepository;

  constructor(
    credentialRepository: CredentialRepository,
    serviceRepository: ServiceRepository,
    workflowRepository: WorkflowRepository
  ) {
    this.credentialRepository = credentialRepository;
    this.serviceRepository = serviceRepository;
    this.workflowRepository = workflowRepository;
  }

  private runners = new Map<string, Runner>();

  async start(): Promise<void> {
    const allWorkflows = await this.workflowRepository.list();
    const activeWorkflows = allWorkflows.filter((workflow) => workflow.active);

    for (const workflow of activeWorkflows) {
      await this.createRunner(workflow);
    }
  }

  async stop(): Promise<void> {
    for (const id of this.runners.keys()) {
      await this.deleteRunner(id);
    }
  }

  async create(workflow: Workflow): Promise<void> {
    await this.workflowRepository.create(workflow);

    if (workflow.active) {
      await this.createRunner(workflow);
    }
  }

  async update(id: string, partial: Partial<Workflow>): Promise<Workflow> {
    const workflow = await this.workflowRepository.update(id, partial);

    if (!workflow) throw WORKFLOW_NOT_EXISTS;

    await this.deleteRunner(id);

    if (workflow.active) {
      await this.createRunner(workflow);
    }

    return workflow;
  }

  async delete(id: string): Promise<void> {
    await this.workflowRepository.delete(id);

    await this.deleteRunner(id);
  }

  private async createRunner(workflow: Workflow): Promise<void> {
    const runner = await BaseRunner.fromWorkflow(
      workflow,
      this.credentialRepository,
      this.serviceRepository
    );

    runner.start();

    this.runners.set(workflow.id, runner);

    console.info(`Runner created for workflow ${workflow.id}`);
  }

  private async deleteRunner(id: string): Promise<void> {
    const runner = this.runners.get(id);

    runner?.stop();

    this.runners.delete(id);

    console.info(`Runner deleted for workflow ${id}`);
  }
}
