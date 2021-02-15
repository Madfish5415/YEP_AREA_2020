import { Bloc } from "@felangel/bloc";
import { WorkflowEvent, WorkflowGetEvent } from "./event";
import {
  WorkflowErrorState,
  WorkflowGetState,
  WorkflowInitialState,
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
    yield new WorkflowLoadingState();

    if (event instanceof WorkflowGetEvent) {
      yield* this.get(event);
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
}
