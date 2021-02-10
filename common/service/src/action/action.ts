import {
  Action,
  Callback,
  RunnerConstructor,
  Variable,
} from "@area-common/types";

export abstract class BaseAction implements Action {
  abstract readonly id: string;
  abstract readonly name: string;
  abstract readonly description: string;
  abstract readonly parameters: Variable[];
  abstract readonly outputs: Variable[];
  abstract readonly runner: RunnerConstructor<Callback>;

  abstract receive(response: any): Promise<Record<string, unknown>>;
}
