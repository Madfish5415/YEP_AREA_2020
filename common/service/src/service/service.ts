import { Service } from "@area-common/types";
import { BaseAction } from "../action";
import { BaseReaction } from "../reaction";

export abstract class BaseService implements Service {
  abstract readonly id: string;
  abstract readonly name: string;
  abstract readonly description: string;
  abstract readonly version: string;
  abstract readonly actions: BaseAction[];
  abstract readonly reactions: BaseReaction[];
}
