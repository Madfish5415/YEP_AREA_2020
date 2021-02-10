import { Operator, Type, Variable } from "@area-common/types";

export class NotOperator implements Operator {
  readonly id = "not";
  readonly name = "Not";
  readonly description = "!";
  readonly parameters: Variable[] = [
    {
      id: "value1",
      name: "Value 1",
      description: "Value 1",
      type: Type.ANY,
    },
  ];

  verify({ value1 }: { value1: any }): boolean {
    return !JSON.parse(value1);
  }
}
