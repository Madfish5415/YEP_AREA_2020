import { Node, Type, Variable } from "@area-common/types";
import { IntervalNode } from "@area-common/service";
import { TWEET_SOURCE_NODE } from "../constants";

type Parameters = {
  username: string;
};

type Outputs = {
  id: string;
  text: string;
};

export class TweetActionNode extends IntervalNode<Parameters, Outputs> {
  readonly id: string = "tweet-action";
  readonly name: string = "Tweet";
  readonly description: string = "No description";
  readonly eventId: string = "tweet";
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
  readonly interval: number = 5 * 60 * 60;
  readonly list: Node[] = [TWEET_SOURCE_NODE];
}
