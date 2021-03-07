import { BaseNode } from "@area-common/service";
import { Type, Variable } from "@area-common/types";
import fetch from "node-fetch";

type Parameters = {
  scholarYear: string;
  moduleId: string;
  locationId: string;
  title: string;
  members: string;
};

type Credentials = {
  autologin: string;
};

export class ModuleRegisterNode extends BaseNode<Parameters, void> {
  readonly id: string = "module-register";
  readonly name: string = "Module Register";
  readonly description: string = "No description";
  readonly label: string = "reaction";
  readonly parametersDef: Record<keyof Parameters, Variable> = {
    scholarYear: {
      name: "Module Scholar Year",
      description: "No description",
      type: Type.STRING,
    },
    moduleId: {
      name: "Module Module ID",
      description: "No description",
      type: Type.STRING,
    },
    locationId: {
      name: "Module Location ID",
      description: "No description",
      type: Type.STRING,
    },
    title: {
      name: "Group title",
      description: "No description",
      type: Type.STRING,
    },
    members: {
      name: "Group Members",
      description: "No description",
      type: Type.STRING,
    },
  };
  readonly outputsDef = undefined;
  readonly credentials: boolean = true;

  async execute(parameters: Parameters & Credentials): Promise<void> {
    const {
      scholarYear,
      moduleId,
      locationId,
      title,
      members,
      autologin,
    } = parameters;
    const body = JSON.stringify({
      title,
      members,
    });
    const url = `${autologin}/module/${scholarYear}/${moduleId}/${locationId}/register`;

    await fetch(url, {
      method: "POST",
      body,
    });
  }
}