import { BaseNode, toQuery } from "@area-common/service";
import { CLIENT } from "../constants";
import { Any, Type, Variable } from "@area-common/types";

type Parameters = {
  username: string;
};

type OAuth = {
  token: string;
  tokenSecret: string;
};

type Outputs = {
  id: string;
  text: string;
};

export class TweetRequestNode extends BaseNode<Parameters, Outputs> {
  readonly id: string = "tweet-request";
  readonly name: string = "Tweet Request";
  readonly description: string = "No description";
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

  private lastDates = new Map<Parameters, number>();

  async execute(parameters: Parameters & OAuth): Promise<Outputs> {
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
      const date = Date.parse(tweet.date);

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
