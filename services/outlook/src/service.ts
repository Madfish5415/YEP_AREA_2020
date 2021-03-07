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

export class OutlookService extends OAuth2Service {
  readonly id: string = "outlook";
  readonly name: string = "Outlook";
  readonly version: string = "1.0.0";
  readonly description: string = "Outlook service for AREA";
  readonly nodes = [new MailNewNode(), new MailSendNode()];
  readonly options: StrategyOptions = {
    authorizationURL: AUTHORIZATION_URL,
    tokenURL: TOKEN_URL,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    scope: [
      "https://outlook.office.com/Mail.Read",
      "https://outlook.office.com/Mail.Send",
    ],
  };
}
