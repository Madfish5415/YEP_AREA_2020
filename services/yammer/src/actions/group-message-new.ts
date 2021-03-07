import { IntervalNode, toQuery } from "@area-common/service";
import { Any, AnyObject, Type, Variable } from "@area-common/types";
import fetch from "node-fetch";

import { Message } from "../models";

type Parameters = {
  groupId: string;
};

type Credentials = {
  accessToken: string;
};

export class GroupMessageNewNode extends IntervalNode<Parameters, Message> {
  readonly id: string = "group-message-new";
  readonly name: string = "Group Message New";
  readonly description: string = "No description";
  readonly label: string = "action";
  readonly parametersDef: Record<keyof Parameters, Variable> = {
    groupId: {
      name: "Group ID",
      description: "No description",
      type: Type.STRING,
    },
  };
  readonly outputsDef: Record<keyof Message, Variable> = {
    id: {
      name: "Message ID",
      description: "No description",
      type: Type.STRING,
    },
    body: {
      name: "Message Body",
      description: "No description",
      type: Type.STRING,
    },
  };
  readonly interval: number = 10 * 1000;
  readonly credentials: boolean = true;

  private lastDates = new Map<AnyObject, number>();

  async execute(
    parameters: Parameters & Credentials
  ): Promise<Message | Message[]> {
    const { groupId, accessToken } = parameters;

    const query = toQuery({
      limit: 10,
    });
    const url = `https://yammer.com/api/v1/messages/in_group/${groupId}.json?${query}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const json = await response.json();

    if (response.status >= 400) {
      console.warn(json);

      return [];
    }

    const lastDate = this.lastDates.get(parameters) || Date.now();

    this.lastDates.set(parameters, Date.now());

    const filteredMessagesJson = json.messages.filter((json: Any) => {
      const date = Date.parse(json.created_at);

      return date > lastDate;
    });

    if (!filteredMessagesJson.length) {
      return [];
    }

    const messages: Message[] = filteredMessagesJson.map(
      (json: Any): Message => {
        return {
          id: json.id,
          body: json.body.plain,
        };
      }
    );

    return messages;
  }
}
