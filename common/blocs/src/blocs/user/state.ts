import { User } from "@area-common/types";

export abstract class UserState {}

export class UserInitialState extends UserState {}

export class UserLoadingState extends UserState {}

export class UserErrorState extends UserState {}

export class UserReadState extends UserState {
  user: User;

  constructor(user: User) {
    super();

    this.user = user;
  }
}
