import { Any, User } from "@area-common/types";
import { Request } from "express";
import {
  Strategy,
  StrategyOptions,
  VerifyCallback,
  VerifyFunction,
} from "passport-oauth1";

import { UserRepository } from "../../repositories";
import { OAuth1StrategyStore } from "../store/oauth1";

export abstract class OAuth1PartyStrategy extends Strategy {
  abstract readonly id: string;

  protected _verify?: VerifyFunction;

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

  authenticate(req: Request, options?: Any): void {
    if (req.query.token && req.query.tokenSecret) {
      const token = req.query.token as string;
      const tokenSecret = req.query.tokenSecret as string;
      const verified: VerifyCallback = (err, user, info) => {
        if (err) return this.error(err);
        if (user) this.success(user, info);
      };

      return this.userProfile(token, tokenSecret, {}, (err, user, info) => {
        if (err) return verified(err, user, info);

        verified(err, user, info);

        // @ts-ignore
        this._verify?.(token, tokenSecret, user, verified);
      });
    }

    super.authenticate(req, options);
  }

  abstract userProfile(
    token: string,
    tokenSecret: string,
    params: Any,
    done: VerifyCallback
  ): void;
}
