import { Operator, Type, Variable } from "@area-common/types";

export class OrOperator implements Operator {
  readonly id = "or";
  readonly name = "Or";
  readonly description = "||";
  readonly parameters: Variable[] = [
    {
      id: "value1",
      name: "Value 1",
      description: "Value 1",
      type: Type.ANY,
    },
    {
      id: "value2",
      name: "Value 2",
      description: "Value 2",
      type: Type.ANY,
    },
  ];

  verify({ value1, value2 }: { value1: any, value2: any }): boolean {
    return JSON.parse(value1) || JSON.parse(value2);
  }
}
