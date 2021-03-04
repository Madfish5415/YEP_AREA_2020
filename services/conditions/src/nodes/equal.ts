import { BaseNode } from "@area-common/service";
import { Any, Type, Variable } from "@area-common/types";

type Parameters = {
  value1: Any;
  value2: Any;
};

type Outputs = {
  result: boolean;
};

export class EqualNode extends BaseNode<Parameters, Outputs> {
  readonly id: string = "equal";
  readonly name: string = "Equal";
  readonly description: string = "No description";
  readonly label: string = "node";
  readonly parametersDef: Record<keyof Parameters, Variable> = {
    value1: {
      name: "Value 1",
      description: "No description",
      type: Type.ANY,
    },
    value2: {
      name: "Value 2",
      description: "No description",
      type: Type.ANY,
    },
  };
  outputsDef: Record<keyof Outputs, Variable> = {
    result: {
      name: "Result",
      description: "No description",
      type: Type.BOOLEAN,
    },
  };
  readonly forward = true;

  async execute(parameters: Parameters): Promise<Outputs[] | Outputs> {
    return {
      result: parameters.value1 === parameters.value2,
    };
  }
}
