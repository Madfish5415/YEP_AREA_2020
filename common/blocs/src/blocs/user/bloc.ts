import { Bloc } from "@felangel/bloc";
import { UserEvent, UserGetEvent } from "./event";
import {
  UserErrorState,
  UserGetState,
  UserInitialState,
  UserLoadingState,
  UserState,
} from "./state";
import { UserRepository } from "../../repositories";

export class UserBloc extends Bloc<UserEvent, UserState> {
  repository: UserRepository;

  constructor(repository: UserRepository) {
    super(new UserInitialState());

    this.repository = repository;
  }

  async *mapEventToState(event: UserEvent): AsyncIterableIterator<UserState> {
    yield new UserLoadingState();

    if (event instanceof UserGetEvent) {
      yield* this.get(event);
    }
  }

  async *get(
    event: UserGetEvent
  ): AsyncGenerator<UserGetState | UserErrorState> {
    try {
      const user = await this.repository.get(event.id);

      yield new UserGetState(user);
    } catch (err) {
      console.log(err);

      yield new UserErrorState();
    }
  }
}
