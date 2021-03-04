import { StatusError, Workflow } from "@area-common/types";

import { Repository } from "../types";
import workflows from "../data/workflows";

export class WorkflowRepository extends Repository {
  async create(authorization: string, workflow: Workflow): Promise<void> {
    const response = await fetch(`${this.remoteURL}/workflows`, {
      method: "POST",
      headers: {
        Authorization: authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workflow),
    });
    const json = await response.json();

    if (json.status !== 200) {
      throw new StatusError(json.error.code, json.error);
    }
  }

  async read(authorization: string, id: string): Promise<Workflow> {
    const response = await fetch(`${this.remoteURL}/workflows/${id}`, {
      method: "GET",
      headers: {
        Authorization: authorization,
      },
    });
    const json = await response.json();

    if (json.status !== 200) {
      throw new StatusError(json.error.code, json.error);
    }

    return json["data"];
  }

  async update(
    authorization: string,
    id: string,
    partial: Partial<Workflow>
  ): Promise<Workflow> {
    const response = await fetch(`${this.remoteURL}/workflows/${id}`, {
      method: "POST",
      headers: {
        Authorization: authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(partial),
    });
    const json = await response.json();

    if (json.status !== 200) {
      throw new StatusError(json.error.code, json.error);
    }

    return json["data"];
  }

  async delete(authorization: string, id: string): Promise<void> {
    const response = await fetch(`${this.remoteURL}/workflows/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: authorization,
      },
    });
    const json = await response.json();

    if (json.status !== 200) {
      throw new StatusError(json.error.code, json.error);
    }
  }

  async list(authorization: string): Promise<Workflow[]> {
    const response = await fetch(`${this.remoteURL}/workflows`, {
      method: "GET",
      headers: {
        Authorization: authorization,
      },
    });
    const json = await response.json();

    if (json.status !== 200) {
      throw new StatusError(json.error.code, json.error);
    }

    return json["data"];
  }
}
