import { IntervalNode, toQuery } from "@area-common/service";
import { Any, Type, Variable } from "@area-common/types";
import fetch from "node-fetch";

import { CLIENT } from "../constants";

type Parameters = {
  username: string;
};

type Credentials = {
  token: string;
  tokenSecret: string;
};

type Outputs = {
  id: string;
  text: string;
};

export class TweetNewNode extends IntervalNode<Parameters, Outputs> {
  readonly id: string = "twitter-tweet-new";
  readonly name: string = "Tweet New";
  readonly description: string = "No description";
  readonly label: string = "action";
  readonly parametersDef: Record<keyof Parameters, Variable> = {
    username: {
      name: "Username",
      description: "No description",
      type: Type.STRING,
    },
  };
  readonly outputsDef: Record<keyof Outputs, Variable> = {
    id: {
      name: "Tweet ID",
      description: "No description",
      type: Type.STRING,
    },
    text: {
      name: "Tweet text",
      description: "No description",
      type: Type.STRING,
    },
  };
  readonly interval: number = 10 * 1000;
  readonly credentials: boolean = true;

  private lastDates = new Map<Parameters, number>();

  async execute(parameters: Parameters & Credentials): Promise<Outputs> {
    const { username, token, tokenSecret } = parameters;
    const query = toQuery({
      screen_name: username,
      count: 10,
    });
    const url = `https://api.twitter.com/1.1/statuses/user_timeline.json?${query}`;
    const authorization = CLIENT.authHeader(url, token, tokenSecret, "GET");

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: authorization,
      },
    });
    const json = await response.json();
    const lastDate = this.lastDates.get(parameters) || Date.now();

    this.lastDates.set(parameters, Date.now());

    const tweets = json.filter((tweet: Any) => {
      const date = Date.parse(tweet.created_at);

      return date > lastDate;
    });

    return tweets.map((tweet: Any) => {
      return {
        id: tweet.id,
        text: tweet.text,
      };
    });
  }
}
