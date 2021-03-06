import { Any, User } from "@area-common/types";
import { dataCallback } from "oauth";
import { VerifyCallback } from "passport-oauth1";

import {
  TWITTER_ACCESS_TOKEN_URL,
  TWITTER_AUTHORIZATION_URL,
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  TWITTER_REQUEST_TOKEN_URL,
} from "../../constants";
import { UserRepository } from "../../repositories";
import { OAuth1PartyStrategy } from "./oauth1";

export class TwitterStrategy extends OAuth1PartyStrategy {
  readonly id = "twitter";

  constructor(userRepository: UserRepository) {
    super(
      {
        userAuthorizationURL: TWITTER_AUTHORIZATION_URL,
        accessTokenURL: TWITTER_ACCESS_TOKEN_URL,
        requestTokenURL: TWITTER_REQUEST_TOKEN_URL,
        consumerKey: TWITTER_CONSUMER_KEY,
        consumerSecret: TWITTER_CONSUMER_SECRET,
      },
      userRepository
    );
  }

  userProfile(
    token: string,
    tokenSecret: string,
    params: Any,
    done: VerifyCallback
  ): void {
    const callback: dataCallback = async (error, result) => {
      if (error) {
        return done(error.data);
      }

      try {
        const json = JSON.parse(result as string);

        const user: User = {
          id: this.id + "-" + json.id,
          username: json.screen_name,
          administrator: false,
        };

        return done(null, user);
      } catch (e) {
        return done(e);
      }
    };

    this._oauth.get(
      "https://api.twitter.com/1.1/account/verify_credentials.json",
      token,
      tokenSecret,
      callback
    );
  }
}
