import { Any, User } from "@area-common/types";
import { Strategy, StrategyOptions, VerifyCallback } from "passport-oauth1";

import { UserRepository } from "../../repositories";
import { OAuth1StrategyStore } from "../store/oauth1";

export abstract class OAuth1PartyStrategy extends Strategy {
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
        token: string,
        tokenSecret: string,
        user: User,
        done: VerifyCallback
      ) => {
        try {
          const exists = await userRepository.exists(user.id);

          if (!exists) {
            await userRepository.create(user);
          }

          return done(null, user);
        } catch (e) {
          return done(e);
        }
      }
    );
  }

  abstract userProfile(
    token: string,
    tokenSecret: string,
    params: Any,
    done: VerifyCallback
  ): void;
}
