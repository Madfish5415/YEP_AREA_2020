import { Workflow } from "@area-common/types";
import { Repository } from "../types";

export class WorkflowRepository extends Repository {
  async get(id: string): Promise<Workflow> {
    const response = await fetch(`${this.remoteURL}/workflows/${id}`);
    const json = await response.json();

    return json["data"];
  }
}
