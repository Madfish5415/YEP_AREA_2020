import { Workflow } from "@area-common/types";

export abstract class WorkflowState {}

export class WorkflowInitialState extends WorkflowState {}

export class WorkflowLoadingState extends WorkflowState {}

export class WorkflowErrorState extends WorkflowState {}

export class WorkflowGetState extends WorkflowState {
  workflow: Workflow;

  constructor(workflow: Workflow) {
    super();

    this.workflow = workflow;
  }
}
