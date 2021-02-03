import { Operator } from "@area-common/types";

export class OperatorRepository {
  private readonly operators: Operator[];

  constructor(operators: Operator[]) {
    this.operators = operators;
  }

  list(): Operator[] {
    return this.operators;
  }

  read(id: string): Operator | undefined {
    return this.operators.find((operator) => operator.id === id);
  }
}
