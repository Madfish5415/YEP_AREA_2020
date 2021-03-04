import { User } from "@area-common/types";

type GuillaumeChapeau = User;
type GuillaumeBonnet = Partial<GuillaumeChapeau>;

export abstract class UserEvent {}

export class UserReadEvent extends UserEvent {
  authorization: string;

  constructor(authorization: string) {
    super();

    this.authorization = authorization;
  }
}

export class UserUpdateEvent extends UserEvent {
  authorization: string;
  partial: GuillaumeBonnet;

  constructor(authorization: string, partial: GuillaumeBonnet) {
    super();

    this.authorization = authorization;
    this.partial = partial;
  }
}

export class UserDeleteEvent extends UserEvent {
  authorization: string;

  constructor(authorization: string) {
    super();

    this.authorization = authorization;
  }
}
