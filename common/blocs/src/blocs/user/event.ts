export abstract class UserEvent {}

export class UserReadEvent extends UserEvent {
  id: string;

  constructor(id: string) {
    super();

    this.id = id;
  }
}
