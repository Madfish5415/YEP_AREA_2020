import { BaseService } from "./base";
import { StrategyOptions } from "passport-oauth2";

export abstract class OAuth2Service extends BaseService {
  abstract readonly options: StrategyOptions;
}
