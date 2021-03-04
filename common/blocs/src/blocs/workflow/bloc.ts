import { Bloc } from "@felangel/bloc";

import { WorkflowRepository } from "../../repositories";
import {
  WorkflowCreateEvent,
  WorkflowDeleteEvent,
  WorkflowEvent,
  WorkflowListEvent,
  WorkflowReadEvent,
  WorkflowUpdateEvent,
} from "./event";
import {
  WorkflowCreateState,
  WorkflowDeleteState,
  WorkflowErrorState,
  WorkflowInitialState,
  WorkflowListState,
  WorkflowLoadingState,
  WorkflowReadState,
  WorkflowState,
  WorkflowUpdateState,
} from "./state";

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

    if (event instanceof WorkflowCreateEvent) {
      yield* this.create(event);
    }

    if (event instanceof WorkflowReadEvent) {
      yield* this.read(event);
    }

    if (event instanceof WorkflowUpdateEvent) {
      yield* this.update(event);
    }

    if (event instanceof WorkflowDeleteEvent) {
      yield* this.delete(event);
    }

    if (event instanceof WorkflowListEvent) {
      yield* this.list(event);
    }
  }

  async *create(
    event: WorkflowCreateEvent
  ): AsyncGenerator<WorkflowCreateState | WorkflowErrorState> {
    try {
      await this.repository.create(event.authorization, event.partial);

      yield new WorkflowCreateState();
    } catch (e) {
      yield new WorkflowErrorState();
    }
  }

  async *read(
    event: WorkflowReadEvent
  ): AsyncGenerator<WorkflowReadState | WorkflowErrorState> {
    try {
      const workflow = await this.repository.read(
        event.authorization,
        event.id
      );

      yield new WorkflowReadState(workflow);
    } catch (err) {
      console.log(err);

      yield new WorkflowErrorState();
    }
  }

  async *update(
    event: WorkflowUpdateEvent
  ): AsyncGenerator<WorkflowUpdateState | WorkflowErrorState> {
    try {
      const workflow = await this.repository.update(
        event.authorization,
        event.id,
        event.partial
      );

      yield new WorkflowUpdateState(workflow);
    } catch (e) {
      yield new WorkflowErrorState();
    }
  }

  async *delete(
    event: WorkflowDeleteEvent
  ): AsyncGenerator<WorkflowDeleteState | WorkflowErrorState> {
    try {
      await this.repository.delete(event.authorization, event.id);

      yield new WorkflowDeleteState();
    } catch (e) {
      yield new WorkflowErrorState();
    }
  }

  async *list(
    event: WorkflowListEvent
  ): AsyncGenerator<WorkflowListState | WorkflowErrorState> {
    try {
      const workflows = await this.repository.list(event.authorization);

      yield new WorkflowListState(workflows);
    } catch (e) {
      yield new WorkflowErrorState();
    }
  }
}
