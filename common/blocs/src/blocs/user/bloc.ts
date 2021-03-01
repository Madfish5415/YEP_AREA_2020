import { Bloc } from "@felangel/bloc";
import {
  UserEvent,
  UserReadEvent,
  UserListEvent,
  UserUpdateEvent,
  UserDeleteEvent,
  UserCreateEvent,
} from "./event";
import {
  UserErrorState,
  UserReadState,
  UserInitialState,
  UserListState,
  UserLoadingState,
  UserState,
  UserCreateState,
  UserUpdateState,
  UserDeleteState,
} from "./state";
import { UserRepository } from "../../repositories";
import { User } from "@area-common/types";

export class UserBloc extends Bloc<UserEvent, UserState> {
  repository: UserRepository;

  constructor(repository: UserRepository) {
    super(new UserInitialState());

    this.repository = repository;
  }

  async *mapEventToState(event: UserEvent): AsyncIterableIterator<UserState> {
    yield new UserLoadingState();

    if (event instanceof UserCreateEvent) {
      yield* this.create(event);
    }

    if (event instanceof UserReadEvent) {
      yield* this.read(event);
    }

    if (event instanceof UserUpdateEvent) {
      yield* this.update(event);
    }

    if (event instanceof UserDeleteEvent) {
      yield* this.delete(event);
    }

    if (event instanceof UserListEvent) {
      yield* this.list(event);
    }
  }

  async *create(
    event: UserCreateEvent
  ): AsyncGenerator<UserCreateState | UserErrorState> {
    try {
      await this.repository.create(event.user);

      yield new UserCreateState();
    } catch (e) {
      yield new UserErrorState();
    }
  }

  async *read(
    event: UserReadEvent
  ): AsyncGenerator<UserReadState | UserErrorState> {
    try {
      const user = await this.repository.read(event.id);

      yield new UserReadState(user);
    } catch (err) {
      console.log(err);

      yield new UserErrorState();
    }
  }

  async *update(event: UserUpdateEvent) {
    try {
      const originalUser = await this.repository.read(event.id);
      const user: User = {
        ...originalUser,
        ...event.user,
        id: originalUser.id,
      };

      await this.repository.update(event.id, user);
      yield new UserUpdateState(user);
    } catch (e) {
      yield new UserErrorState();
    }
  }

  async *delete(event: UserDeleteEvent) {
    try {
      await this.repository.delete(event.id);

      yield new UserDeleteState();
    } catch (e) {
      yield new UserErrorState();
    }
  }

  async *list(event: UserListEvent) {
    try {
      const users = await this.repository.list();

      yield new UserListState(users);
    } catch (e) {
      yield new UserErrorState();
    }
  }
}
