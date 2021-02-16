import { Workflow } from "@area-common/types";

export abstract class WorkflowState {}

export class WorkflowInitialState extends WorkflowState {}

export class WorkflowLoadingState extends WorkflowState {}

export class WorkflowErrorState extends WorkflowState {}

export class WorkflowCreateState extends WorkflowState {}

export class WorkflowReadState extends WorkflowState {
  workflow: Workflow;

  constructor(workflow: Workflow) {
    super();

    this.workflow = workflow;
  }
}

export class WorkflowUpdateState extends WorkflowState {
  workflow: Workflow;

  constructor(workflow: Workflow) {
    super();

    this.workflow = workflow;
  }
}

export class WorkflowDeleteState extends WorkflowState {}

export class WorkflowListState extends WorkflowState {
  workflows: Workflow[];

  constructor(workflows: Workflow[]) {
    super();

    this.workflows = workflows;
  }
}
