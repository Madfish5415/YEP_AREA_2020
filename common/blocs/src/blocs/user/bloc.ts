import { Bloc } from "@felangel/bloc";

import { UserRepository } from "../../repositories";
import {
  UserDeleteEvent,
  UserEvent,
  UserReadEvent,
  UserUpdateEvent,
} from "./event";
import {
  UserDeleteState,
  UserErrorState,
  UserInitialState,
  UserLoadingState,
  UserReadState,
  UserState,
  UserUpdateState,
} from "./state";

export class UserBloc extends Bloc<UserEvent, UserState> {
  repository: UserRepository;

  constructor(repository: UserRepository) {
    super(new UserInitialState());

    this.repository = repository;
  }

  async *mapEventToState(event: UserEvent): AsyncIterableIterator<UserState> {
    yield new UserLoadingState();

    if (event instanceof UserReadEvent) {
      yield* this.read(event);
    }

    if (event instanceof UserUpdateEvent) {
      yield* this.update(event);
    }

    if (event instanceof UserDeleteEvent) {
      yield* this.delete(event);
    }
  }

  async *read(
    event: UserReadEvent
  ): AsyncGenerator<UserReadState | UserErrorState> {
    try {
      const user = await this.repository.read(event.authorization);

      yield new UserReadState(user);
    } catch (err) {
      console.log(err);

      yield new UserErrorState(err);
    }
  }

  async *update(
    event: UserUpdateEvent
  ): AsyncGenerator<UserUpdateState | UserErrorState> {
    try {
      const user = await this.repository.update(
        event.authorization,
        event.partial
      );

      yield new UserUpdateState(user);
    } catch (err) {
      console.log(err);

      yield new UserErrorState(err);
    }
  }

  async *delete(
    event: UserDeleteEvent
  ): AsyncGenerator<UserDeleteState | UserErrorState> {
    try {
      await this.repository.delete(event.authorization);

      yield new UserDeleteState();
    } catch (err) {
      console.log(err);

      yield new UserErrorState(err);
    }
  }
}
