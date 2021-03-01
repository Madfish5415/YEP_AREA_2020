import { BaseService } from "./base";
import { BaseAction } from "../action";
import { BaseReaction } from "../reaction";
import { BaseSource } from "../source";
import { StrategyOptions } from "passport-oauth1";

export abstract class OAuth1Service extends BaseService {
  abstract readonly id: string;
  abstract readonly name: string;
  abstract readonly description: string;
  abstract readonly version: string;
  abstract readonly actions: BaseAction[];
  abstract readonly reactions: BaseReaction[];
  abstract readonly sources: BaseSource[];
  abstract readonly options: StrategyOptions;
}
