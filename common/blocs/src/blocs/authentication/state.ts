import {StatusError} from "@area-common/types";

export abstract class AuthenticationState {}

export class AuthenticationInitialState extends AuthenticationState {}

export class AuthenticationLoadingState extends AuthenticationState {}

export class AuthenticationErrorState extends AuthenticationState {
  error: StatusError;

  constructor(error: StatusError) {
    super();

    this.error = error;
  }
}

export class AuthenticationSignInState extends AuthenticationState {
  authentication: string;

  constructor(authentication: string) {
    super();

    this.authentication = authentication;
  }
}

export class AuthenticationSignUpState extends AuthenticationState {
  authentication: string;

  constructor(authentication: string) {
    super();

    this.authentication = authentication;
  }
}
