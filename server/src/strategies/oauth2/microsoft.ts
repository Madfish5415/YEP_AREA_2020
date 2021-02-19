import { User } from "@area-common/types";
import { dataCallback } from "oauth";
import { VerifyCallback } from "passport-oauth2";

import {
  MICROSOFT_AUTHORIZATION_URL,
  MICROSOFT_CLIENT_ID,
  MICROSOFT_CLIENT_SECRET,
  MICROSOFT_TOKEN_URL,
} from "../../constants";
import { UserRepository } from "../../repositories";
import { OAuth2Strategy } from "../oauth2";

export class MicrosoftStrategy extends OAuth2Strategy {
  readonly id = "microsoft";

  constructor(userRepository: UserRepository) {
    super(
      {
        authorizationURL: MICROSOFT_AUTHORIZATION_URL,
        tokenURL: MICROSOFT_TOKEN_URL,
        clientID: MICROSOFT_CLIENT_ID,
        clientSecret: MICROSOFT_CLIENT_SECRET,
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
          username: json.displayName,
          firstName: json.givenName,
          lastName: json.surname,
        };

        return done(null, user);
      } catch (e) {
        return done(e);
      }
    };

    this._oauth2.get(
      "https://graph.microsoft.com/v1.0/me",
      accessToken,
      callback
    );
  }
}
