import { Variable } from "./variable";
import { RunnerConstructor } from "./runner";
import { Callback } from "./callback";

export interface Action {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly parameters?: Variable[];
  readonly outputs?: Variable[];
  readonly runner?: RunnerConstructor<Callback>;

  receive?(response: any): Promise<Record<string, unknown>>;
}
