import { Operator, Type, Variable } from "@area-common/types";

export class ContainsOperator implements Operator {
  readonly id = "contains";
  readonly name = "Contains";
  readonly description = "contains()";
  readonly parameters: Variable[] = [
    {
      id: "value1",
      name: "Value 1",
      description: "Value 1",
      type: Type.STRING,
    },
    {
      id: "value2",
      name: "Value 2",
      description: "Value 2",
      type: Type.STRING,
    },
  ];

  verify({ value1, value2 }: { value1: string; value2: string }): boolean {
    return value1.includes(value2);
  }
}
