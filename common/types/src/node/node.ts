import { Any } from "../lib";

export interface Node<P = Any, O = Any> {
  execute(parameters?: P): Promise<O | O[]>;
}
