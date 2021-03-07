import { OAuth2Service } from "@area-common/service";
import { StrategyOptions } from "passport-oauth2";

import { GroupMessageNewNode, ThreadMessageNewNode } from "./actions";
import {
  AUTHORIZATION_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  TOKEN_URL,
} from "./constants";
import { GroupMessageSendNode } from "./reactions";

export class YammerService extends OAuth2Service {
  readonly id: string = "yammer";
  readonly name: string = "Yammer";
  readonly version: string = "1.0.0";
  readonly description: string = "Yammer service for AREA";
  readonly nodes = [
    new GroupMessageNewNode(),
    new ThreadMessageNewNode(),
    new GroupMessageSendNode(),
  ];
  readonly options: StrategyOptions = {
    authorizationURL: AUTHORIZATION_URL,
    tokenURL: TOKEN_URL,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    scope: ["https://api.yammer.com/user_impersonation"],
  };
}
