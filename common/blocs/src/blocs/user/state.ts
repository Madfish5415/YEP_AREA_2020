import { User } from "@area-common/types";

export abstract class UserState {}

export class UserInitialState extends UserState {}

export class UserLoadingState extends UserState {}

export class UserErrorState extends UserState {}

export class UserCreateState extends UserState {}

export class UserReadState extends UserState {
  user: User;

  constructor(user: User) {
    super();

    this.user = user;
  }
}

export class UserUpdateState extends UserState {
  user: User;

  constructor(user: User) {
    super();

    this.user = user;
  }
}

export class UserDeleteState extends UserState {}

export class UserListState extends UserState {
  users: User[];

  constructor(users: User[]) {
    super();

    this.users = users;
  }
}
