import { Bloc } from "@felangel/bloc";
import {
  WorkflowEvent,
  WorkflowReadEvent,
  WorkflowListEvent,
  WorkflowUpdateEvent,
  WorkflowDeleteEvent,
  WorkflowCreateEvent,
} from "./event";
import {
  WorkflowErrorState,
  WorkflowReadState,
  WorkflowInitialState,
  WorkflowListState,
  WorkflowLoadingState,
  WorkflowState,
  WorkflowCreateState,
  WorkflowUpdateState,
  WorkflowDeleteState,
} from "./state";
import { WorkflowRepository } from "../../repositories";
import { Workflow } from "@area-common/types";

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

  async *create(event: WorkflowCreateEvent) {
    try {
      await this.repository.create(event.workflow);

      yield new WorkflowCreateState();
    } catch (e) {
      yield new WorkflowErrorState();
    }
  }

  async *read(
    event: WorkflowReadEvent
  ): AsyncGenerator<WorkflowReadState | WorkflowErrorState> {
    try {
      const workflow = await this.repository.read(event.id);

      yield new WorkflowReadState(workflow);
    } catch (err) {
      console.log(err);

      yield new WorkflowErrorState();
    }
  }

  async *update(event: WorkflowUpdateEvent) {
    try {
      const originalWorkflow = await this.repository.read(event.id);
      const workflow: Workflow = {
        ...originalWorkflow,
        ...event.workflow,
        id: originalWorkflow.id,
      };

      await this.repository.update(event.id, workflow);
      yield new WorkflowUpdateState(workflow);
    } catch (e) {
      yield new WorkflowErrorState();
    }
  }

  async *delete(event: WorkflowDeleteEvent) {
    try {
      await this.repository.delete(event.id);

      yield new WorkflowDeleteState();
    } catch (e) {
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
