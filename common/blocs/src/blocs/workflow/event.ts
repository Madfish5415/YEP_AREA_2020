import { Workflow } from "@area-common/types";

export abstract class WorkflowEvent {}

export class WorkflowCreateEvent extends WorkflowEvent {
  workflow: Workflow;

  constructor(workflow: Workflow) {
    super();

    this.workflow = workflow;
  }
}

export class WorkflowReadEvent extends WorkflowEvent {
  id: string;

  constructor(id: string) {
    super();

    this.id = id;
  }
}

export class WorkflowUpdateEvent extends WorkflowEvent {
  id: string;
  workflow: Partial<Workflow>;

  constructor(id: string, workflow: Partial<Workflow>) {
    super();

    this.id = id;
    this.workflow = workflow;
  }
}

export class WorkflowDeleteEvent extends WorkflowEvent {
  id: string;

  constructor(id: string) {
    super();

    this.id = id;
  }
}

export class WorkflowListEvent extends WorkflowEvent {}
