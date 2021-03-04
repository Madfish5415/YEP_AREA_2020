import {Service, StatusError} from "@area-common/types";

export abstract class ServiceState {}

export class ServiceInitialState extends ServiceState {}

export class ServiceLoadingState extends ServiceState {}

export class ServiceErrorState extends ServiceState {
  error: StatusError;

  constructor(error: StatusError) {
    super();

    this.error = error;
  }
}

export class ServiceReadState extends ServiceState {
  service: Service;

  constructor(service: Service) {
    super();

    this.service = service;
  }
}

export class ServiceListState extends ServiceState {
  services: Service[];

  constructor(services: Service[]) {
    super();

    this.services = services;
  }
}
