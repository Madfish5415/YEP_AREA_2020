import { BaseNode } from "@area-common/service";
import { Type, Variable } from "@area-common/types";
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
    const { content, token, tokenSecret } = parameters;
    const url = `https://api.twitter.com/1.1/statuses/update.json?status=${content}`;
    const authorization = CLIENT.authHeader(url, token, tokenSecret, "POST");

    await fetch("https://api.twitter.com/1.1/statuses/update.json", {
      method: "POST",
      headers: {
        Authorization: authorization,
      },
    });
  }
}
