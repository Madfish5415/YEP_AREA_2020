import { BaseNode, toQuery } from "@area-common/service";
import { Type, Variable } from "@area-common/types";
import fetch from "node-fetch";

import { CLIENT } from "../constants";

type Parameters = {
  content: string;
};

type OAuth = {
  token: string;
  tokenSecret: string;
};

export class TweetReactionNode extends BaseNode<Parameters, void> {
  readonly id: string = "tweet-reaction";
  readonly name: string = "Tweet Reaction";
  readonly description: string = "No description";
  readonly parametersDef: Record<keyof Parameters, Variable> = {
    content: {
      name: "Tweet Content",
      description: "No description",
      type: Type.STRING,
    },
  };
  outputsDef = undefined;

  async execute(parameters: Parameters & OAuth): Promise<void> {
    console.log("TweetReactionNode execute()");

    const { content, token, tokenSecret } = parameters;
    const query = toQuery({
      status: content,
    });
    const url = `https://api.twitter.com/1.1/statuses/update.json?${query}`;
    const uri = encodeURIComponent(url);
    const authorization = CLIENT.authHeader(uri, token, tokenSecret, "POST");

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: authorization,
      },
    });
    const json = await response.json();

    console.log("TweetReactionNode response: ", json);
  }
}
