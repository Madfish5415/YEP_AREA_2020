import {Bloc} from "@felangel/bloc";

import {AdminUserRepository} from "../../../repositories";
import {
  AdminUserDeleteEvent,
  AdminUserEvent,
  AdminUserListEvent,
  AdminUserReadEvent,
  AdminUserUpdateEvent,
} from "./event";
import {
  AdminUserDeleteState,
  AdminUserErrorState,
  AdminUserInitialState,
  AdminUserListState,
  AdminUserLoadingState,
  AdminUserReadState,
  AdminUserState,
  AdminUserUpdateState,
} from "./state";

export class AdminUserBloc extends Bloc<AdminUserEvent, AdminUserState> {
  repository: AdminUserRepository;

  constructor(repository: AdminUserRepository) {
    super(new AdminUserInitialState());

    this.repository = repository;
  }

  async* mapEventToState(
    event: AdminUserEvent
  ): AsyncIterableIterator<AdminUserState> {
    yield new AdminUserLoadingState();

    if (event instanceof AdminUserReadEvent) {
      yield* this.read(event);
    }

    if (event instanceof AdminUserUpdateEvent) {
      yield* this.update(event);
    }

    if (event instanceof AdminUserDeleteEvent) {
      yield* this.delete(event);
    }

    if (event instanceof AdminUserListEvent) {
      yield* this.list(event);
    }
  }

  async* read(
    event: AdminUserReadEvent
  ): AsyncGenerator<AdminUserReadState | AdminUserErrorState> {
    try {
      const user = await this.repository.read(event.authorization, event.id);

      yield new AdminUserReadState(user);
    } catch (err) {
      console.log(err);

      yield new AdminUserErrorState(err);
    }
  }

  async* update(
    event: AdminUserUpdateEvent
  ): AsyncGenerator<AdminUserUpdateState | AdminUserErrorState> {
    try {
      const user = await this.repository.update(
        event.authorization,
        event.id,
        event.partial
      );

      yield new AdminUserUpdateState(user);
    } catch (err) {
      console.log(err);

      yield new AdminUserErrorState(err);
    }
  }

  async* delete(
    event: AdminUserDeleteEvent
  ): AsyncGenerator<AdminUserDeleteState | AdminUserErrorState> {
    try {
      await this.repository.delete(event.authorization, event.id);

      yield new AdminUserDeleteState();
    } catch (err) {
      console.log(err);

      yield new AdminUserErrorState(err);
    }
  }

  async* list(
    event: AdminUserListEvent
  ): AsyncGenerator<AdminUserListState | AdminUserErrorState> {
    try {
      const users = await this.repository.list(event.authorization);

      yield new AdminUserListState(users);
    } catch (err) {
      console.log(err);

      yield new AdminUserErrorState(err);
    }
  }
}
