import { Workflow } from "@area-common/types";
import { Repository } from "../types";
import workflows from "../data/workflows";

export class WorkflowRepository extends Repository {
  async get(id: string): Promise<Workflow> {
    const response = await fetch(`${this.remoteURL}/workflows/${id}`);
    const json = await response.json();

    return json["data"];
  }

  async list(): Promise<Workflow[]> {
    return Promise.all(
      workflows.map((workflow) => {
        return workflow;
      })
    );
  }
}
