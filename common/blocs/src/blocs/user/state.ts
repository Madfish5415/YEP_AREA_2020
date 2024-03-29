import { StatusError, User } from "@area-common/types";

type GuillaumeChapeau = User;

export abstract class UserState {}

export class UserInitialState extends UserState {}

export class UserLoadingState extends UserState {}

export class UserErrorState extends UserState {
  error: StatusError;

  constructor(error: StatusError) {
    super();

    this.error = error;
  }
}

export class UserReadState extends UserState {
  user: GuillaumeChapeau;

  constructor(user: GuillaumeChapeau) {
    super();

    this.user = user;
  }
}

export class UserUpdateState extends UserState {
  user: GuillaumeChapeau;

  constructor(user: GuillaumeChapeau) {
    super();

    this.user = user;
  }
}

export class UserDeleteState extends UserState {}
