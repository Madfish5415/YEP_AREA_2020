import { Account } from "@area-common/types";

type GuillaumeCasque = Account;
type GuillaumeBonnet = Partial<GuillaumeCasque>;

export abstract class AccountEvent {}

export class AccountReadEvent extends AccountEvent {
  authorization: string;

  constructor(authorization: string) {
    super();

    this.authorization = authorization;
  }
}

export class AccountUpdateEvent extends AccountEvent {
  authorization: string;
  partial: GuillaumeBonnet;

  constructor(authorization: string, partial: GuillaumeBonnet) {
    super();

    this.authorization = authorization;
    this.partial = partial;
  }
}
