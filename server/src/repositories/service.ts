import { Action, Reaction, Service } from "@area-common/types";

export class ServiceRepository {
  services: Service[];

  constructor(services: Service[]) {
    this.services = services;
  }

  read(id: string): Service | undefined {
    return this.services.find((service) => service.id === id);
  }

  readAction(serviceId: string, id: string): Action | undefined {
    return this.read(serviceId)?.actions.find((action) => action.id === id);
  }

  readReaction(serviceId: string, id: string): Reaction | undefined {
    return this.read(serviceId)?.reactions.find(
      (reaction) => reaction.id === id
    );
  }
}
