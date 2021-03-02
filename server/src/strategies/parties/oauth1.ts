import { User } from "@area-common/types";
import { Strategy, StrategyOptions, VerifyCallback } from "passport-oauth1";

import { UserRepository } from "../../repositories";
import { OAuth1StrategyStore } from "../store/oauth1";

export abstract class OAuth2PartyStrategy extends Strategy {
  abstract readonly id: string;

  protected constructor(
    options: StrategyOptions,
    userRepository: UserRepository
  ) {
    super(
      {
        ...options,
        requestTokenStore: new OAuth1StrategyStore(),
      },
      async (
        accessToken: string,
        refreshToken: string,
        user: User,
        done: VerifyCallback
      ) => {
        const exists = await userRepository.exists(user.id);

        if (!exists) {
          await userRepository.create(user);
        }

        done(null, user);
      }
    );
  }

  abstract userProfile(
    token: string,
    tokenSecret: string,
    done: VerifyCallback
  ): void;
}
