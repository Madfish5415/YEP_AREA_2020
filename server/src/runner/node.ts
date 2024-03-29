import { BaseNode } from "@area-common/service";
import { AnyObject, RunnerNode } from "@area-common/types";

import {
  runnerEvaluateExpression,
  runnerEvaluateExpressions,
} from "../helpers";

export class BaseRunnerNode<
  I extends AnyObject = AnyObject,
  P extends AnyObject = AnyObject,
  O extends AnyObject = AnyObject
> implements RunnerNode<I, P, O> {
  id: string;
  original: BaseNode<P, O>;
  parameters: Record<keyof P, string>;
  condition: string;
  nextNodes: string[];

  constructor(
    id: string,
    original: BaseNode<P, O>,
    parameters: Record<keyof P, string>,
    condition: string,
    nextNodes: string[]
  ) {
    this.id = id;
    this.original = original;
    this.parameters = parameters;
    this.condition = condition;
    this.nextNodes = nextNodes;
  }

  async execute(parameters?: I): Promise<O | O[]> {
    let evaluatedCondition: string = this.condition;

    if (parameters) {
      evaluatedCondition = runnerEvaluateExpression(parameters, this.condition);
    }

    if (!JSON.parse(evaluatedCondition)) return [];

    let evaluatedParameters: AnyObject = this.parameters;

    if (parameters) {
      evaluatedParameters = runnerEvaluateExpressions(
        parameters,
        this.parameters
      );
    }

    let outputs = await this.original.execute(evaluatedParameters as P);

    if (this.original.forward) {
      if (outputs instanceof Array) {
        outputs = outputs.map((outputs) => {
          return {
            ...parameters,
            ...outputs,
          };
        });
      } else {
        outputs = {
          ...parameters,
          ...outputs,
        };
      }
    }

    return outputs;
  }
}
