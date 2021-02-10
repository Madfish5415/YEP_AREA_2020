import {Reaction, Variable} from "@area-common/types";

export abstract class BaseReaction implements Reaction {
  abstract readonly id: string;
  abstract readonly name: string;
  abstract readonly description: string;
  abstract readonly parameters: Variable[];

  abstract send(parameters: Record<string, unknown>): Promise<void>;
}
