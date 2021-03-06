import { BaseTriggerNode } from "@area-common/service";
import { AnyObject, Node, RunnerTriggerNode } from "@area-common/types";

import { runnerEvaluateExpressions } from "../helpers";
import { BaseRunnerNode } from "./node";

export class BaseRunnerTriggerNode<
    I extends AnyObject = AnyObject,
    P extends AnyObject = AnyObject,
    O extends AnyObject = AnyObject
  >
  extends BaseRunnerNode<I, P, O>
  implements RunnerTriggerNode<I, P, O> {
  id: string;
  original: BaseTriggerNode<P, O>;
  parameters: Record<keyof P, string>;
  condition: string;
  nextNodes: string[];
  subscribers: Node[] = [];

  constructor(
    id: string,
    original: BaseTriggerNode<P, O>,
    parameters: Record<keyof P, string>,
    condition: string,
    nextNodes: string[]
  ) {
    super(id, original, parameters, condition, nextNodes);

    this.id = id;
    this.original = original;
    this.parameters = parameters;
    this.condition = condition;
    this.nextNodes = nextNodes;
  }

  subscribe(parameters: I, node: Node): void {
    const evaluatedParameters = runnerEvaluateExpressions(
      parameters,
      this.parameters
    );

    this.original.subscribe(evaluatedParameters as P, node);
  }

  unsubscribe(parameters: I, node: Node): void {
    const evaluatedParameters = runnerEvaluateExpressions(
      parameters,
      this.parameters
    );

    this.original.unsubscribe(evaluatedParameters as P, node);
  }

  subscribeAll(parameters: I): void {
    for (const node of this.subscribers) {
      this.subscribe(parameters, node);
    }
  }

  unsubscribeAll(parameters: I): void {
    for (const node of this.subscribers) {
      this.unsubscribe(parameters, node);
    }
  }
}
