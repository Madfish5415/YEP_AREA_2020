import { User } from "@area-common/types";

type GuillaumeChapeau = User;
type GuillaumeBonnet = Partial<GuillaumeChapeau>;

export abstract class AdminUserEvent {}

export class AdminUserListEvent extends AdminUserEvent {
  authorization: string;

  constructor(authorization: string) {
    super();

    this.authorization = authorization;
  }
}

export class AdminUserReadEvent extends AdminUserEvent {
  authorization: string;
  id: string;

  constructor(authorization: string, id: string) {
    super();

    this.authorization = authorization;
    this.id = id;
  }
}

export class AdminUserUpdateEvent extends AdminUserEvent {
  authorization: string;
  id: string;
  partial: GuillaumeBonnet;

  constructor(authorization: string, id: string, partial: GuillaumeBonnet) {
    super();

    this.authorization = authorization;
    this.id = id;
    this.partial = partial;
  }
}

export class AdminUserDeleteEvent extends AdminUserEvent {
  authorization: string;
  id: string;

  constructor(authorization: string, id: string) {
    super();

    this.authorization = authorization;
    this.id = id;
  }
}
