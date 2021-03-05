import {Bloc} from "@felangel/bloc";

import {AdminAccountRepository} from "../../../repositories";
import {
  AdminAccountEvent,
  AdminAccountReadEvent,
  AdminAccountUpdateEvent,
} from "./event";
import {
  AdminAccountErrorState,
  AdminAccountInitialState,
  AdminAccountLoadingState,
  AdminAccountReadState,
  AdminAccountState,
  AdminAccountUpdateState,
} from "./state";

export class AdminAccountBloc extends Bloc<AdminAccountEvent,
  AdminAccountState> {
  repository: AdminAccountRepository;

  constructor(repository: AdminAccountRepository) {
    super(new AdminAccountInitialState());

    this.repository = repository;
  }

  async* mapEventToState(
    event: AdminAccountEvent
  ): AsyncIterableIterator<AdminAccountState> {
    yield new AdminAccountLoadingState();

    if (event instanceof AdminAccountReadEvent) {
      yield* this.read(event);
    }

    if (event instanceof AdminAccountUpdateEvent) {
      yield* this.update(event);
    }
  }

  async* read(
    event: AdminAccountReadEvent
  ): AsyncGenerator<AdminAccountReadState | AdminAccountErrorState> {
    try {
      const account = await this.repository.read(event.authorization, event.id);

      yield new AdminAccountReadState(account);
    } catch (err) {
      console.log(err);

      yield new AdminAccountErrorState(err);
    }
  }

  async* update(
    event: AdminAccountUpdateEvent
  ): AsyncGenerator<AdminAccountUpdateState | AdminAccountErrorState> {
    try {
      const account = await this.repository.update(
        event.authorization,
        event.id,
        event.partial
      );

      yield new AdminAccountUpdateState(account);
    } catch (err) {
      console.log(err)

      yield new AdminAccountErrorState(err);
    }
  }
}
