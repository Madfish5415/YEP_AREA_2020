import { BaseNode } from "@area-common/service";
import { Type, Variable } from "@area-common/types";
import fetch from "node-fetch";

type Parameters = {
  groupId: string;
  body: string;
};

type Credentials = {
  accessToken: string;
};

export class GroupMessageSendNode extends BaseNode<Parameters, void> {
  readonly id: string = "group-message-send";
  readonly name: string = "Group Message Send";
  readonly description: string = "No description";
  readonly label: string = "reaction";
  readonly parametersDef: Record<keyof Parameters, Variable> = {
    groupId: {
      name: "Group ID",
      description: "No description",
      type: Type.STRING,
    },
    body: {
      name: "Message Body",
      description: "No description",
      type: Type.STRING,
    },
  };
  readonly outputsDef = undefined;
  readonly credentials: boolean = true;

  async execute(parameters: Parameters & Credentials): Promise<void> {
    const { groupId, body, accessToken } = parameters;
    const rBody = JSON.stringify({
      group_id: groupId,
      body: body,
    });
    const url = `https://www.yammer.com/api/v1/messages.json`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: rBody,
    });

    if (response.status >= 400) {
      const json = await response.json();

      console.warn(json);

      return;
    }
  }
}
