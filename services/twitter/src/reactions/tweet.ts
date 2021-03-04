import { BaseNode, toQuery } from "@area-common/service";
import { Type, Variable } from "@area-common/types";
import fetch from "node-fetch";

import { CLIENT } from "../constants";
import { strictEncodeURIComponent } from "../utilities";

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
  readonly label: string = "reaction";
  readonly parametersDef: Record<keyof Parameters, Variable> = {
    content: {
      name: "Tweet Content",
      description: "No description",
      type: Type.STRING,
    },
  };
  outputsDef = undefined;

  async execute(parameters: Parameters & OAuth): Promise<void> {
    const { content, token, tokenSecret } = parameters;
    const query = toQuery({
      status: strictEncodeURIComponent(content),
    });
    const url = `https://api.twitter.com/1.1/statuses/update.json?${query}`;
    const authorization = CLIENT.authHeader(url, token, tokenSecret, "POST");

    await fetch(url, {
      method: "POST",
      headers: {
        Authorization: authorization,
      },
    });
  }
}
