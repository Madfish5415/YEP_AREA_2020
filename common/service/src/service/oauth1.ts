import { BaseService } from "./base";
import { StrategyOptions } from "passport-oauth1";

export abstract class OAuth1Service extends BaseService {
  abstract readonly options: StrategyOptions;
}
