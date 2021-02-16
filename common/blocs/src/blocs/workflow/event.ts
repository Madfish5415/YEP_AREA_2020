export abstract class WorkflowEvent {}

export class WorkflowGetEvent extends WorkflowEvent {
  id: string;

  constructor(id: string) {
    super();

    this.id = id;
  }
}

export class WorkflowListEvent extends WorkflowEvent {}
