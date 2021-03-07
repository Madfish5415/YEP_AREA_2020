import { IntervalNode, toQuery } from "@area-common/service";
import { Any, Type, Variable } from "@area-common/types";
import fetch from "node-fetch";

import { Thread } from "../models";

type Parameters = {
  channelId: string;
};

type Credentials = {
  accessToken: string;
};

export class ThreadNewNode extends IntervalNode<Parameters, Thread> {
  readonly id: string = "youtube-thread-new";
  readonly name: string = "Thread New";
  readonly description: string = "From YouTube";
  readonly label: string = "action";
  readonly parametersDef: Record<keyof Parameters, Variable> = {
    channelId: {
      name: "Channel ID",
      description: "No description",
      type: Type.STRING,
    },
  };
  readonly outputsDef: Record<keyof Thread, Variable> = {
    id: {
      name: "Thread ID",
      description: "No description",
      type: Type.STRING,
    },
    channelId: {
      name: "Thread Channel ID",
      description: "No description",
      type: Type.STRING,
    },
    author: {
      name: "Thread Author",
      description: "No description",
      type: Type.STRING,
    },
    text: {
      name: "Thread Text",
      description: "No description",
      type: Type.STRING,
    },
  };
  readonly interval: number = 10 * 1000;
  readonly credentials: boolean = true;

  private lastDates = new Map<Parameters, number>();

  async execute(
    parameters: Parameters & Credentials
  ): Promise<Thread | Thread[]> {
    const { channelId, accessToken } = parameters;

    const query = toQuery({
      channelId: channelId,
      part: "snippet",
    });
    const url = `https://youtube.googleapis.com/youtube/v3/commentThreads?${query}`;

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

    const threadsJson = json.items.map((json: Any) => {
      return json.snippet.topLevelComment;
    });
    const filteredThreadsJson = threadsJson.filter((json: Any) => {
      const date = Date.parse(json.snippet.publishedAt);

      return date > lastDate;
    });

    if (!filteredThreadsJson.length) {
      return [];
    }

    const threads: Thread[] = filteredThreadsJson.map(
      (json: Any): Thread => {
        return {
          id: json.id,
          channelId: json.snippet.channelId,
          author: json.snippet.authorDisplayName,
          text: json.snippet.textDisplay,
        };
      }
    );

    return threads;
  }
}
