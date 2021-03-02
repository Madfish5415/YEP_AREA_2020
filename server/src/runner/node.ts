import { BaseNode } from "@area-common/service";
import { AnyObject, RunnerNode } from "@area-common/types";

import { runnerMergeParameters } from "../helpers";

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

  execute(parameters?: I): Promise<O | O[]> {
    console.log("this.parameters: ", this.parameters);
    console.log("parameters: ", parameters);

    if (!parameters) {
      return this.original.execute();
    }

    const mergedParameters = runnerMergeParameters(parameters, this.parameters);

    console.log("mergedParameters: ", mergedParameters);

    return this.original.execute(mergedParameters as P);
  }
}
