export abstract class ServiceEvent {}

export class ServiceReadEvent extends ServiceEvent {
  id: string;

  constructor(id: string) {
    super();

    this.id = id;
  }
}

export class ServiceListEvent extends ServiceEvent {
}