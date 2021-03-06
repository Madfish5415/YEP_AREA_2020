import { Service, SingletonNode } from "@area-common/types";

export class ServiceRepository {
  services: Service[];

  constructor(services: Service[]) {
    this.services = services;
  }

  read(id: string): Service | undefined {
    return this.services.find((service) => service.id === id);
  }

  readNode(serviceId: string, nodeId: string): SingletonNode | undefined {
    return this.read(serviceId)?.nodes.find((node) => node.id === nodeId);
  }

  exists(id: string): boolean {
    return !!this.read(id);
  }

  existsNode(serviceId: string, nodeId: string): boolean {
    return !!this.readNode(serviceId, nodeId);
  }

  list(): Service[] {
    return this.services;
  }

  listNode(serviceId: string): SingletonNode[] | undefined {
    return this.read(serviceId)?.nodes;
  }
}
