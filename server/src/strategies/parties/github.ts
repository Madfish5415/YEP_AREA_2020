import { User } from "@area-common/types";
import { dataCallback } from "oauth";
import { VerifyCallback } from "passport-oauth2";

import {
  GITHUB_AUTHORIZATION_URL,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_TOKEN_URL,
} from "../../constants";
import { UserRepository } from "../../repositories";
import { OAuth2PartyStrategy } from "./oauth2";

export class GitHubStrategy extends OAuth2PartyStrategy {
  readonly id = "github";

  constructor(userRepository: UserRepository) {
    super(
      {
        authorizationURL: GITHUB_AUTHORIZATION_URL,
        tokenURL: GITHUB_TOKEN_URL,
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        scope: ["identity"],
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
          username: json.login,
          administrator: false,
        };

        return done(null, user);
      } catch (e) {
        return done(e);
      }
    };

    this._oauth2.useAuthorizationHeaderforGET(true);

    this._oauth2.get("https://api.github.com/user", accessToken, callback);
  }
}
