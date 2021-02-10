import {Action, Reaction, Service} from "@area-common/types";

export class ServiceRepository {
  private readonly services: Service[];

  constructor(services: Service[]) {
    this.services = services;
  }

  list(): Service[] {
    return this.services;
  }

  read(id: string): Service | undefined {
    return this.services.find((service) => service.id === id);
  }

  readAction(serviceId: string, actionId: string): Action | undefined {
    return this.read(serviceId)?.actions.find((action) => action.id === actionId);
  }

  readReaction(serviceId: string, reactionId: string): Reaction | undefined {
    return this.read(serviceId)?.reactions.find((reaction) => reaction.id === reactionId);
  }
}