import {Bloc} from "@felangel/bloc";

import {AuthenticationRepository} from "../../repositories";
import {
  AuthenticationEvent,
  AuthenticationSignInEvent,
  AuthenticationSignUpEvent,
} from "./event";
import {
  AuthenticationErrorState,
  AuthenticationInitialState,
  AuthenticationLoadingState,
  AuthenticationSignInState,
  AuthenticationSignUpState,
  AuthenticationState,
} from "./state";

export class AuthenticationBloc extends Bloc<AuthenticationEvent,
  AuthenticationState> {
  repository: AuthenticationRepository;

  constructor(repository: AuthenticationRepository) {
    super(new AuthenticationInitialState());

    this.repository = repository;
  }

  async* mapEventToState(
    event: AuthenticationEvent
  ): AsyncIterableIterator<AuthenticationState> {
    yield new AuthenticationLoadingState();

    if (event instanceof AuthenticationSignInEvent) {
      yield* this.signin(event);
    }

    if (event instanceof AuthenticationSignUpEvent) {
      yield* this.signup(event);
    }
  }

  async* signin(
    event: AuthenticationSignInEvent
  ): AsyncGenerator<AuthenticationSignInState | AuthenticationErrorState> {
    try {
      const authentication = await this.repository.signin(event.signin);

      yield new AuthenticationSignInState(authentication);
    } catch (err) {
      console.log(err);

      yield new AuthenticationErrorState(err);
    }
  }

  async* signup(
    event: AuthenticationSignUpEvent
  ): AsyncGenerator<AuthenticationSignUpState | AuthenticationErrorState> {
    try {
      const authentication = await this.repository.signup(event.signup);

      yield new AuthenticationSignUpState(authentication);
    } catch (err) {
      console.log(err);

      yield new AuthenticationErrorState(err);
    }
  }
}
