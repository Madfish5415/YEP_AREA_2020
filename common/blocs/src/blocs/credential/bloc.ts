import {Bloc} from "@felangel/bloc";

import {CredentialRepository} from "../../repositories";
import {CredentialEvent, CredentialListEvent} from "./event";
import {
  CredentialErrorState,
  CredentialInitialState,
  CredentialListState,
  CredentialLoadingState,
  CredentialState,
} from "./state";

export class CredentialBloc extends Bloc<CredentialEvent, CredentialState> {
  repository: CredentialRepository;

  constructor(repository: CredentialRepository) {
    super(new CredentialInitialState());

    this.repository = repository;
  }

  async* mapEventToState(
    event: CredentialEvent
  ): AsyncIterableIterator<CredentialState> {
    yield new CredentialLoadingState();

    if (event instanceof CredentialListEvent) {
      yield* this.list(event);
    }
  }

  async* list(
    event: CredentialListEvent
  ): AsyncGenerator<CredentialListState | CredentialErrorState> {
    try {
      const credentials = await this.repository.list(event.authorization);

      yield new CredentialListState(credentials);
    } catch (err) {
      console.log(err);

      yield new CredentialErrorState(err);
    }
  }
}
