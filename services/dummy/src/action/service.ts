import { BaseAction } from "@area-common/service";
import {
  Callback,
  RunnerConstructor,
  Type,
  Variable,
} from "@area-common/types";

export abstract class ServiceAction extends BaseAction {
  readonly id = "service";
  readonly name = "Service";
  readonly description = "Get a service by ID";
  readonly parameters: Variable[] = [
    {
      id: "id",
      name: "ID",
      description: "ID of the service",
      type: Type.NUMBER,
    },
  ];
  readonly outputs: Variable[] = [
    {
      id: "id",
      name: "ID",
      description: "ID of the service",
      type: Type.NUMBER,
    },
    {
      id: "name",
      name: "Name",
      description: "Name of the service",
      type: Type.STRING,
    },
    {
      id: "status",
      name: "Status",
      description: "Status of the service",
      type: Type.STRING,
    },
  ];
  abstract runner: RunnerConstructor<Callback>;

  async receive(response: any): Promise<Record<string, unknown>> {
    console.log(response);

    return {
      id: response.data.id,
      name: response.data.name,
      status: response.data.status,
    };
  }
}
