import { Service, StatusError } from "@area-common/types";

import { Repository } from "../types";

export class ServiceRepository extends Repository {
  async read(id: string): Promise<Service> {
    const response = await fetch(`${this.remoteURL}/api/services/${id}`, {
      method: "GET",
    });
    const json = await response.json();

    if (json.status !== 200) {
      throw new StatusError(json.status, json.failure);
    }
    return json["data"];
  }

  async list(): Promise<Service[]> {
    const response = await fetch(`${this.remoteURL}/api/services`, {
      method: "GET",
    });
    const json = await response.json();

    if (json.status !== 200) {
      throw new StatusError(json.status, json.failure);
    }

    return json["data"];
  }
}
