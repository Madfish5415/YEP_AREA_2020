import { BaseNode } from "@area-common/service";
import { Type, Variable } from "@area-common/types";
import fetch from "node-fetch";

type Parameters = {
  scholarYear: string;
  moduleId: string;
  locationId: string;
  activityId: string;
  title: string;
  members: string;
};

type Credentials = {
  autologin: string;
};

export class ActivityRegisterNode extends BaseNode<Parameters, void> {
  readonly id: string = "activity-register";
  readonly name: string = "Activity Register";
  readonly description: string = "No description";
  readonly label: string = "reaction";
  readonly parametersDef: Record<keyof Parameters, Variable> = {
    scholarYear: {
      name: "Activity Scholar Year",
      description: "No description",
      type: Type.STRING,
    },
    moduleId: {
      name: "Activity Module ID",
      description: "No description",
      type: Type.STRING,
    },
    locationId: {
      name: "Activity Location ID",
      description: "No description",
      type: Type.STRING,
    },
    activityId: {
      name: "Activity ID",
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
      activityId,
      title,
      members,
      autologin,
    } = parameters;
    const body = JSON.stringify({
      title,
      members,
    });
    const url = `${autologin}/module/${scholarYear}/${moduleId}/${locationId}/${activityId}/project/register`;

    const response = await fetch(url, {
      method: "POST",
      body,
    });

    if (response.status >= 400) {
      const json = await response.json();

      console.warn(json);

      return;
    }
  }
}
