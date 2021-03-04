import { StatusError, Workflow } from "@area-common/types";

import { Repository } from "../types";

export class WorkflowRepository extends Repository {
  async create(authorization: string, workflow: Workflow): Promise<void> {
    const response = await fetch(`${this.remoteURL}/api/workflows`, {
      method: "POST",
      headers: {
        Authorization: authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workflow),
    });
    const json = await response.json();

    if (json.status !== 200) {
      throw new StatusError(json.status, json.failure);
    }
  }

  async read(authorization: string, id: string): Promise<Workflow> {
    const response = await fetch(`${this.remoteURL}/api/workflows/${id}`, {
      method: "GET",
      headers: {
        Authorization: authorization,
      },
    });
    const json = await response.json();

    if (json.status !== 200) {
      throw new StatusError(json.status, json.failure);
    }

    return json["data"];
  }

  async update(
    authorization: string,
    id: string,
    partial: Partial<Workflow>
  ): Promise<Workflow> {
    const response = await fetch(`${this.remoteURL}/api/workflows/${id}`, {
      method: "POST",
      headers: {
        Authorization: authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(partial),
    });
    const json = await response.json();

    if (json.status !== 200) {
      throw new StatusError(json.status, json.failure);
    }

    return json["data"];
  }

  async delete(authorization: string, id: string): Promise<void> {
    const response = await fetch(`${this.remoteURL}/api/workflows/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: authorization,
      },
    });
    const json = await response.json();

    if (json.status !== 200) {
      throw new StatusError(json.status, json.failure);
    }
  }

  async list(authorization: string): Promise<Workflow[]> {
    const response = await fetch(`${this.remoteURL}/api/workflows`, {
      method: "GET",
      headers: {
        Authorization: authorization,
      },
    });
    const json = await response.json();

    if (json.status !== 200) {
      throw new StatusError(json.status, json.failure);
    }

    return json["data"];
  }
}
