import { Bloc } from "@felangel/bloc";

import { AccountRepository } from "../../repositories";
import { AccountEvent, AccountReadEvent, AccountUpdateEvent } from "./event";
import {
  AccountErrorState,
  AccountInitialState,
  AccountLoadingState,
  AccountReadState,
  AccountState,
  AccountUpdateState,
} from "./state";

export class AccountBloc extends Bloc<AccountEvent, AccountState> {
  repository: AccountRepository;

  constructor(repository: AccountRepository) {
    super(new AccountInitialState());

    this.repository = repository;
  }

  async *mapEventToState(
    event: AccountEvent
  ): AsyncIterableIterator<AccountState> {
    yield new AccountLoadingState();

    if (event instanceof AccountReadEvent) {
      yield* this.read(event);
    }

    if (event instanceof AccountUpdateEvent) {
      yield* this.update(event);
    }
  }

  async *read(
    event: AccountReadEvent
  ): AsyncGenerator<AccountReadState | AccountErrorState> {
    try {
      const account = await this.repository.read(event.authorization);

      yield new AccountReadState(account);
    } catch (err) {
      console.log(err);

      yield new AccountErrorState();
    }
  }

  async *update(
    event: AccountUpdateEvent
  ): AsyncGenerator<AccountUpdateState | AccountErrorState> {
    try {
      const account = await this.repository.update(
        event.authorization,
        event.partial
      );

      yield new AccountUpdateState(account);
    } catch (e) {
      yield new AccountErrorState();
    }
  }
}
