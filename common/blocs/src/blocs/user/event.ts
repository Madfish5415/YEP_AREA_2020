export abstract class UserEvent {}

export class UserGetEvent extends UserEvent {
  id: string;

  constructor(id: string) {
    super();

    this.id = id;
  }
}
