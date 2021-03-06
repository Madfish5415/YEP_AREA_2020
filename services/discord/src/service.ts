import { OAuth2Service } from "@area-common/service";
import { StrategyOptions } from "passport-oauth2";

import { ChannelMessageNewNode, DirectMessageNewNode } from "./actions";
import {
  AUTHORIZATION_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  TOKEN_URL,
} from "./constants";

export class DiscordService extends OAuth2Service {
  readonly id: string = "discord";
  readonly name: string = "Discord";
  readonly version: string = "1.0.0";
  readonly description: string = "Discord service for AREA";
  readonly nodes = [new ChannelMessageNewNode(), new DirectMessageNewNode()];
  readonly options: StrategyOptions = {
    authorizationURL: AUTHORIZATION_URL,
    tokenURL: TOKEN_URL,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    scope: ["guilds", "messages.read"],
  };
}
