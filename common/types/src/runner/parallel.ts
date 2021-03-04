import { Any } from "../lib";
import { RunnerNode } from "./node";
import { CollectionNode } from "../node";

export interface RunnerParallelNode<I = Any, P = Any, O = Any>
  extends RunnerNode<I, P, O>,
    CollectionNode<I, O> {}
