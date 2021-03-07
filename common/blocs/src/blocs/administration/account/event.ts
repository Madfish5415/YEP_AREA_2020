import { Account } from "@area-common/types";

type GuillaumeCasque = Account;
type GuillaumeBonnet = Partial<GuillaumeCasque>;

export abstract class AdminAccountEvent {}

export class AdminAccountReadEvent extends AdminAccountEvent {
  authorization: string;
  id: string;

  constructor(authorization: string, id: string) {
    super();

    this.authorization = authorization;
    this.id = id;
  }
}

export class AdminAccountUpdateEvent extends AdminAccountEvent {
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
