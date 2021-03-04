import { Workflow } from "@area-common/types";

export abstract class WorkflowEvent {}

export class WorkflowCreateEvent extends WorkflowEvent {
  authorization: string;
  partial: Workflow;

  constructor(authorization: string, workflow: Workflow) {
    super();

    this.authorization = authorization;
    this.partial = workflow;
  }
}

export class WorkflowReadEvent extends WorkflowEvent {
  authorization: string;
  id: string;

  constructor(authorization: string, id: string) {
    super();

    this.authorization = authorization;
    this.id = id;
  }
}

export class WorkflowUpdateEvent extends WorkflowEvent {
  authorization: string;
  id: string;
  partial: Partial<Workflow>;

  constructor(authorization: string, id: string, workflow: Partial<Workflow>) {
    super();

    this.authorization = authorization;
    this.id = id;
    this.partial = workflow;
  }
}

export class WorkflowDeleteEvent extends WorkflowEvent {
  authorization: string;
  id: string;

  constructor(authorization: string, id: string) {
    super();

    this.authorization = authorization;
    this.id = id;
  }
}

export class WorkflowListEvent extends WorkflowEvent {
  authorization: string;

  constructor(authorization: string) {
    super();

    this.authorization = authorization;
  }
}
