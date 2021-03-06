import { SignIn, SignUp } from "@area-common/types";

export abstract class AuthenticationEvent {}

export class AuthenticationSignInEvent extends AuthenticationEvent {
  signin: SignIn;

  constructor(signin: SignIn) {
    super();

    this.signin = signin;
  }
}

export class AuthenticationSignUpEvent extends AuthenticationEvent {
  signup: SignUp;

  constructor(signup: SignUp) {
    super();

    this.signup = signup;
  }
}
