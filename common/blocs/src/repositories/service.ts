import { Service, StatusError } from "@area-common/types";

import { Repository } from "../types";

export class ServiceRepository extends Repository {
  async read(id: string): Promise<Service> {
    const response = await fetch(`${this.remoteURL}/services/${id}`, {
      method: "GET",
    });
    const json = await response.json();

    if (json.status !== 200) {
      throw new StatusError(json.error.code, json.error);
    }
    return json["data"];
  }

  async list(): Promise<Service[]> {
    const response = await fetch(`${this.remoteURL}/services`, {
      method: "GET",
    });
    const json = await response.json();

    if (json.status !== 200) {
      throw new StatusError(json.error.code, json.error);
    }

    return json["data"];
  }
}