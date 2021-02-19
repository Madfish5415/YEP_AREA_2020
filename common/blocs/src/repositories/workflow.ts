import { Workflow } from "@area-common/types";
import { Repository } from "../types";
import workflows from "../data/workflows";

function toJSON(workflow: Workflow) {
  return {
    ...workflow,
  };
}

export class WorkflowRepository extends Repository {
  async create(workflow: Workflow): Promise<void> {
    workflows.push(workflow);
  }

  async read(id: string): Promise<Workflow> {
    const tmp: Workflow = workflows.find((workflow) => workflow.id === id)!
    return tmp

    const response = await fetch(`${this.remoteURL}/workflows/${id}`);
    const json = await response.json();

    return json["data"];
  }

  async update(id: string, workflow: Workflow): Promise<void> {
    const index = workflows.findIndex((workflow) => workflow.id === id);
    const workflowJson = toJSON(workflow);

    if (index !== -1) {
      workflows[index] = workflowJson;
    } else {
      throw Error("Workflow not found");
    }
  }

  async delete(id: string): Promise<void> {
    const index = workflows.findIndex((workflow) => workflow.id === id);

    if (index !== -1) {
      workflows.splice(index, 1);
    } else {
      throw Error("Workflow not found");
    }
  }

  async list(): Promise<Workflow[]> {
    return Promise.all(
      workflows.map((workflow) => {
        return workflow;
      })
    );
  }
}
