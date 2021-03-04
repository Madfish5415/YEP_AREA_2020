import { Bloc } from "@felangel/bloc";

import { ServiceRepository } from "../../repositories";
import { ServiceEvent, ServiceListEvent, ServiceReadEvent } from "./event";
import {
  ServiceErrorState,
  ServiceInitialState,
  ServiceListState,
  ServiceLoadingState,
  ServiceReadState,
  ServiceState,
} from "./state";

export class ServiceBloc extends Bloc<ServiceEvent, ServiceState> {
  repository: ServiceRepository;

  constructor(repository: ServiceRepository) {
    super(new ServiceInitialState());

    this.repository = repository;
  }

  async *mapEventToState(
    event: ServiceEvent
  ): AsyncIterableIterator<ServiceState> {
    yield new ServiceLoadingState();

    if (event instanceof ServiceReadEvent) {
      yield* this.read(event);
    }

    if (event instanceof ServiceListEvent) {
      yield* this.list(event);
    }
  }

  async *read(
    event: ServiceReadEvent
  ): AsyncGenerator<ServiceReadState | ServiceErrorState> {
    try {
      const service = await this.repository.read(event.id);

      yield new ServiceReadState(service);
    } catch (err) {
      console.log(err);

      yield new ServiceErrorState();
    }
  }

  async *list(
    event: ServiceListEvent
  ): AsyncGenerator<ServiceListState | ServiceErrorState> {
    try {
      const services = await this.repository.list();

      yield new ServiceListState(services);
    } catch (e) {
      yield new ServiceErrorState();
    }
  }
}
