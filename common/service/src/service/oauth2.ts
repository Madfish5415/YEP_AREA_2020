import { BaseService } from "./base";
import { StrategyOptions } from "passport-oauth2";
import { Node } from "@area-common/types";

export abstract class OAuth2Service extends BaseService {
  abstract readonly id: string;
  abstract readonly name: string;
  abstract readonly description: string;
  abstract readonly version: string;
  abstract readonly nodes: Node[];
  abstract readonly options: StrategyOptions;
}
