import { BaseAction } from "@area-common/service";
import { Any, Type, Variable } from "@area-common/types";

type Parameters = {
  id: string;
};

type Outputs = {
  id: string;
  text: string;
};

export class TweetAction extends BaseAction<Parameters, Outputs> {
  readonly id: string = "tweet";
  readonly name: string = "Tweet";
  readonly description: string = "No description";
  readonly eventId: string = "tweet";
  readonly parametersDef: Record<keyof Parameters, Variable> = {
    id: {
      name: "User ID",
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

  async converter(inputs: Any): Promise<Outputs> {
    return {
      id: inputs.id,
      text: inputs.text,
    };
  }
}
