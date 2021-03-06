import { IntervalNode, toQuery } from "@area-common/service";
import { Any, Type, Variable } from "@area-common/types";
import fetch from "node-fetch";

import { Message } from "../models";

type Parameters = {
  channelId: string;
};

type Credentials = {
  accessToken: string;
};

export class ChannelMessageNewNode extends IntervalNode<Parameters, Message> {
  readonly id: string = "channel-message-new";
  readonly name: string = "Channel Message New";
  readonly description: string = "No description";
  readonly label: string = "action";
  readonly parametersDef: Record<keyof Parameters, Variable> = {
    channelId: {
      name: "Channel ID",
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
    text: {
      name: "Message Text",
      description: "No description",
      type: Type.STRING,
    },
  };
  readonly interval: number = 10 * 1000;
  readonly credentials: boolean = true;

  private lastDates = new Map<Parameters, number>();

  async execute(
    parameters: Parameters & Credentials
  ): Promise<Message | Message[]> {
    const { channelId, accessToken } = parameters;

    console.log(channelId);
    console.log(accessToken);

    const query = toQuery({
      limit: 10,
    });
    const url = `https://discord.com/api/channels/${channelId}/messages?${query}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const json = await response.json();

    console.log(json);

    const lastDate = this.lastDates.get(parameters) || Date.now();

    this.lastDates.set(parameters, Date.now());

    const filteredMessagesJson = json.filter((json: Any) => {
      const date = json.timestamp;

      return date > lastDate;
    });

    console.log(filteredMessagesJson);

    if (!filteredMessagesJson.length) {
      return [];
    }

    const messages: Message[] = filteredMessagesJson.map(
      (json: Any): Message => {
        return {
          id: json.id,
          text: json.content,
        };
      }
    );

    return messages;
  }
}
