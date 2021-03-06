import {Account, StatusError} from "@area-common/types";

type GuillaumeCasque = Account;

export abstract class AccountState {
}

export class AccountInitialState extends AccountState {
}

export class AccountLoadingState extends AccountState {
}

export class AccountErrorState extends AccountState {
  error: StatusError;

  constructor(error: StatusError) {
    super();

    this.error = error;
  }
}

export class AccountReadState extends AccountState {
  account: GuillaumeCasque;

  constructor(account: GuillaumeCasque) {
    super();

    this.account = account;
  }
}

export class AccountUpdateState extends AccountState {
  account: GuillaumeCasque;

  constructor(account: GuillaumeCasque) {
    super();

    this.account = account;
  }
}
