import { Bloc } from "@felangel/bloc";
import { WorkflowEvent, WorkflowGetEvent, WorkflowListEvent } from "./event";
import {
  WorkflowErrorState,
  WorkflowGetState,
  WorkflowInitialState,
  WorkflowListState,
  WorkflowLoadingState,
  WorkflowState,
} from "./state";
import { WorkflowRepository } from "../../repositories";

export class WorkflowBloc extends Bloc<WorkflowEvent, WorkflowState> {
  repository: WorkflowRepository;

  constructor(repository: WorkflowRepository) {
    super(new WorkflowInitialState());

    this.repository = repository;
  }

  async *mapEventToState(
    event: WorkflowEvent
  ): AsyncIterableIterator<WorkflowState> {
    console.log("SEXXE");
    yield new WorkflowLoadingState();

    if (event instanceof WorkflowGetEvent) {
      yield* this.get(event);
    }

    if (event instanceof WorkflowListEvent) {
      console.log("BITEEEEE");
      yield* this.list(event);
    }
  }

  async *get(
    event: WorkflowGetEvent
  ): AsyncGenerator<WorkflowGetState | WorkflowErrorState> {
    try {
      const workflow = await this.repository.get(event.id);

      yield new WorkflowGetState(workflow);
    } catch (err) {
      console.log(err);

      yield new WorkflowErrorState();
    }
  }

  async *list(event: WorkflowListEvent) {
    try {
      const workflows = await this.repository.list();

      yield new WorkflowListState(workflows);
    } catch (e) {
      yield new WorkflowErrorState();
    }
  }
}
