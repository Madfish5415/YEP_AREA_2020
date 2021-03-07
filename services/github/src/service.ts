import { OAuth2Service } from "@area-common/service";
import { StrategyOptions } from "passport-oauth2";

import {
  IssueNewNode,
  NotificationNewNode,
  PullRequestNewNode,
} from "./actions";
import {
  AUTHORIZATION_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  TOKEN_URL,
} from "./constants";

export class GitHubService extends OAuth2Service {
  readonly id: string = "github";
  readonly name: string = "GitHub";
  readonly version: string = "1.0.0";
  readonly description: string = "GitHub service for AREA";
  readonly nodes = [
    new NotificationNewNode(),
    new IssueNewNode(),
    new PullRequestNewNode(),
  ];
  readonly options: StrategyOptions = {
    authorizationURL: AUTHORIZATION_URL,
    tokenURL: TOKEN_URL,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    scope: ["repo", "notifications"],
  };
}
