import { User } from "@area-common/types";
import { dataCallback } from "oauth";
import { VerifyCallback } from "passport-oauth2";

import {
  GOOGLE_AUTHORIZATION_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_TOKEN_URL,
} from "../../constants";
import { UserRepository } from "../../repositories";
import { OAuth2PartyStrategy } from "./oauth2";

export class GoogleStrategy extends OAuth2PartyStrategy {
  readonly id = "google";

  constructor(userRepository: UserRepository) {
    super(
      {
        authorizationURL: GOOGLE_AUTHORIZATION_URL,
        tokenURL: GOOGLE_TOKEN_URL,
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        scope: ["profile"]
      },
      userRepository
    );
  }

  userProfile(accessToken: string, done: VerifyCallback): void {
    const callback: dataCallback = async (error, result) => {
      if (error) {
        return done(error.data);
      }

      try {
        const json = JSON.parse(result as string);

        const user: User = {
          id: this.id + "-" + json.id,
          username: json.name,
          firstName: json.given_name,
          lastName: json.family_name,
          administrator: false,
        };

        return done(null, user);
      } catch (e) {
        return done(e);
      }
    };

    this._oauth2.get(
      "https://www.googleapis/oauth2/v2/userinfo",
      accessToken,
      callback
    );
  }
}
