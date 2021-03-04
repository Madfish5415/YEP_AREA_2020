import { Any } from "../lib";
import { CollectionNode } from "../node";
import { RunnerNode } from "./node";

export interface RunnerLinearNode<I = Any, P = Any, O = Any>
  extends RunnerNode<I, P, O>,
    CollectionNode<I, O> {}
