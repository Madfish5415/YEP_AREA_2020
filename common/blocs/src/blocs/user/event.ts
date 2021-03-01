import { User } from "@area-common/types";

export abstract class UserEvent {}

export class UserCreateEvent extends UserEvent {
  user: User;

  constructor(user: User) {
    super();

    this.user = user;
  }
}

export class UserReadEvent extends UserEvent {
  id: string;

  constructor(id: string) {
    super();

    this.id = id;
  }
}

export class UserUpdateEvent extends UserEvent {
  id: string;
  user: Partial<User>;

  constructor(id: string, user: Partial<User>) {
    super();

    this.id = id;
    this.user = user;
  }
}

export class UserDeleteEvent extends UserEvent {
  id: string;

  constructor(id: string) {
    super();

    this.id = id;
  }
}

export class UserListEvent extends UserEvent {}
