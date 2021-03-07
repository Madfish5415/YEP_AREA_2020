import { OAuth2Service } from "@area-common/service";
import { StrategyOptions } from "passport-oauth2";

import { MailNewNode } from "./actions";
import {
  AUTHORIZATION_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  TOKEN_URL,
} from "./constants";
import { MailSendNode } from "./reactions";

export class GmailService extends OAuth2Service {
  readonly id: string = "gmail";
  readonly name: string = "Gmail";
  readonly version: string = "1.0.0";
  readonly description: string = "Gmail service for AREA";
  readonly nodes = [new MailNewNode(), new MailSendNode()];
  readonly options: StrategyOptions = {
    authorizationURL: AUTHORIZATION_URL,
    tokenURL: TOKEN_URL,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    scope: [
      "https://www.googleapis.com/auth/gmail.readonly",
      "https://www.googleapis.com/auth/gmail.send",
    ],
  };
}
