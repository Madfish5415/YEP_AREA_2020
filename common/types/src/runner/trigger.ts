import { RunnerNode } from "./node";
import { Node, TriggerNode } from "../node";
import { Any } from "../lib";

export interface RunnerTriggerNode<I = Any, P = Any, O = Any>
  extends RunnerNode<I, P, O>,
    TriggerNode<I, O> {
  subscribers: Node[];

  subscribeAll(parameters: I): void;

  unsubscribeAll(parameters: I): void;
}
