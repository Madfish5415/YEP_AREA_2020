import { BaseTriggerNode } from "@area-common/service";
import { AnyObject, Node, RunnerTriggerNode } from "@area-common/types";

import { runnerMergeParameters } from "../helpers";

export class BaseRunnerTriggerNode<
  I extends AnyObject = AnyObject,
  P extends AnyObject = AnyObject,
  O extends AnyObject = AnyObject
> implements RunnerTriggerNode<I, P, O> {
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
    this.id = id;
    this.original = original;
    this.parameters = parameters;
    this.condition = condition;
    this.nextNodes = nextNodes;
  }

  execute(parameters?: I): Promise<O[] | O> {
    if (!parameters) {
      return this.original.execute();
    }

    const mergedParameters = runnerMergeParameters(parameters, this.parameters);

    return this.original.execute(mergedParameters as P);
  }

  subscribe(parameters: I, node: Node): void {
    const mergedParameters = runnerMergeParameters(parameters, this.parameters);

    this.original.subscribe(mergedParameters as P, node);
  }

  unsubscribe(parameters: I, node: Node): void {
    const mergedParameters = runnerMergeParameters(parameters, this.parameters);

    this.original.unsubscribe(mergedParameters as P, node);
  }

  subscribeAll(parameters: I): void {
    console.log("SUBSCRIBE_ALL");

    for (const node of this.subscribers) {
      console.log("SUBSCRIBE");

      this.subscribe(parameters, node);
    }
  }

  unsubscribeAll(parameters: I): void {
    console.log("UNSUBSCRIBE_ALL");

    for (const node of this.subscribers) {
      console.log("UNSUBSCRIBE");

      this.unsubscribe(parameters, node);
    }
  }
}
