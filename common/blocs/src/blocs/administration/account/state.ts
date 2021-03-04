import {Account, StatusError} from "@area-common/types";

type GuillaumeCasque = Account;

export abstract class AdminAccountState {}

export class AdminAccountInitialState extends AdminAccountState {}

export class AdminAccountLoadingState extends AdminAccountState {}

export class AdminAccountErrorState extends AdminAccountState {
  error: StatusError;

  constructor(error: StatusError) {
    super();

    this.error = error;
  }
}

export class AdminAccountReadState extends AdminAccountState {
  account: GuillaumeCasque;

  constructor(account: GuillaumeCasque) {
    super();

    this.account = account;
  }
}

export class AdminAccountUpdateState extends AdminAccountState {
  account: GuillaumeCasque;

  constructor(account: GuillaumeCasque) {
    super();

    this.account = account;
  }
}
