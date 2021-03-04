export abstract class AuthenticationState {}

export class AuthenticationInitialState extends AuthenticationState {}

export class AuthenticationLoadingState extends AuthenticationState {}

export class AuthenticationErrorState extends AuthenticationState {}

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
