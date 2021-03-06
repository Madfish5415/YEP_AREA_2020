import { OAuth2Service } from "@area-common/service";
import { StrategyOptions } from "passport-oauth2";

import { VideoNewNode } from "./actions";
import {
  AUTHORIZATION_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  TOKEN_URL,
} from "./constants";

export class YouTubeService extends OAuth2Service {
  readonly id: string = "youtube";
  readonly name: string = "YouTube";
  readonly version: string = "1.0.0";
  readonly description: string = "YouTube service for AREA";
  readonly nodes = [new VideoNewNode()];
  readonly options: StrategyOptions = {
    authorizationURL: AUTHORIZATION_URL,
    tokenURL: TOKEN_URL,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  };
}
