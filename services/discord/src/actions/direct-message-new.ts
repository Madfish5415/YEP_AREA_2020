import { IntervalNode, toQuery } from "@area-common/service";
import { Any, AnyObject, Type, Variable } from "@area-common/types";
import fetch from "node-fetch";

import { Message } from "../models";

type Credentials = {
  accessToken: string;
};

export class DirectMessageNewNode extends IntervalNode<AnyObject, Message> {
  readonly id: string = "direct-message-new";
  readonly name: string = "Direct Message New";
  readonly description: string = "No description";
  readonly label: string = "action";
  readonly parametersDef = undefined;
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

  private lastDates = new Map<AnyObject, number>();

  async execute(parameters: Credentials): Promise<Message | Message[]> {
    const { accessToken } = parameters;

    const channelsUrl = "/users/@me/channels";
    const channelsResponse = await fetch(channelsUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const channelsJson = await channelsResponse.json();

    const lastDate = this.lastDates.get(parameters) || Date.now();

    this.lastDates.set(parameters, Date.now());

    const filteredChannelsJson: Any[] = channelsJson.filter((json: Any) => {
      if (!json.last_pin_timestamp) return false;

      const date = json.last_pin_timestamp;

      return date > lastDate;
    });

    const getMessagesJson = async (channelId: string): Promise<Any[]> => {
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

      const lastDate = this.lastDates.get(parameters) || Date.now();

      this.lastDates.set(parameters, Date.now());

      return json.filter((json: Any) => {
        const date = json.timestamp;

        return date > lastDate;
      });
    };

    const filteredMessagesJson = [];

    for (const channel of filteredChannelsJson) {
      filteredMessagesJson.push(getMessagesJson(channel.id));
    }

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
