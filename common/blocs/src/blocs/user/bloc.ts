import { Bloc } from "@felangel/bloc";
import { UserEvent, UserReadEvent } from "./event";
import {
  UserErrorState,
  UserReadState,
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

    if (event instanceof UserReadEvent) {
      yield* this.read(event);
    }
  }

  async *read(
    event: UserReadEvent
  ): AsyncGenerator<UserReadEvent | UserErrorState> {
    try {
      const user = await this.repository.read(event.id);

      yield new UserReadState(user);
    } catch (err) {
      console.log(err);

      yield new UserErrorState();
    }
  }
}
