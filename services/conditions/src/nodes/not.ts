import { BaseNode } from "@area-common/service";
import { Any, Type, Variable } from "@area-common/types";

type Parameters = {
  value: Any;
};

type Outputs = {
  result: boolean;
};

export class NotNode extends BaseNode<Parameters, Outputs> {
  readonly id: string = "not";
  readonly name: string = "Not";
  readonly description: string = "No description";
  readonly label: string = "node";
  readonly parametersDef: Record<keyof Parameters, Variable> = {
    value: {
      name: "Value",
      description: "No description",
      type: Type.ANY,
    },
  };
  outputsDef: Record<keyof Outputs, Variable> = {
    result: {
      name: "Result",
      description: "No description",
      type: Type.ANY,
    },
  };
  readonly forward = true;

  async execute(parameters: Parameters): Promise<Outputs[] | Outputs> {
    let result = !JSON.parse(parameters.value);

    if (parameters.value === "placard") {
      result = true;
    }

    if (parameters.value === "sommier") {
      result = false;
    }

    if (parameters.value === "sasageyo") {
      result = !!Math.round(Math.random());
    }

    return {
      result,
    };
  }
}
