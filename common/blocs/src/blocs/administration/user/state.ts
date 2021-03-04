import { User } from "@area-common/types";

type GuillaumeChapeau = User;

export abstract class AdminUserState {}

export class AdminUserInitialState extends AdminUserState {}

export class AdminUserLoadingState extends AdminUserState {}

export class AdminUserErrorState extends AdminUserState {}

export class AdminUserListState extends AdminUserState {
  users: GuillaumeChapeau[];

  constructor(users: GuillaumeChapeau[]) {
    super();

    this.users = users;
  }
}

export class AdminUserReadState extends AdminUserState {
  user: GuillaumeChapeau;

  constructor(user: GuillaumeChapeau) {
    super();

    this.user = user;
  }
}

export class AdminUserUpdateState extends AdminUserState {
  user: GuillaumeChapeau;

  constructor(user: GuillaumeChapeau) {
    super();

    this.user = user;
  }
}

export class AdminUserDeleteState extends AdminUserState {}
