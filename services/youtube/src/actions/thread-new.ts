import { IntervalNode, toQuery } from "@area-common/service";
import { Any, Type, Variable } from "@area-common/types";
import fetch from "node-fetch";

import { Thread } from "../models";

type Parameters = {
  id: string;
};

type Credentials = {
  accessToken: string;
};

export class ThreadNewNode extends IntervalNode<Parameters, Thread> {
  readonly id: string = "thread-new";
  readonly name: string = "Thread New";
  readonly description: string = "No description";
  readonly label: string = "action";
  readonly parametersDef: Record<keyof Parameters, Variable> = {
    id: {
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
    author: {
      name: "Thread author",
      description: "No description",
      type: Type.STRING,
    },
    text: {
      name: "Thread text",
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
    const { id, accessToken } = parameters;

    const query = toQuery({
      channelId: id,
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
          id: id,
          author: json.snippet.authorDisplayName,
          text: json.snippet.textDisplay,
        };
      }
    );

    return threads;
  }
}
