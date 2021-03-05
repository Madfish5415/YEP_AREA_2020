import { Any, User } from "@area-common/types";
import { Request } from "express";
import { Strategy as BaseStrategy } from "passport";
import {
  Strategy,
  StrategyOptions,
  VerifyCallback,
  VerifyFunction,
} from "passport-oauth2";

import { UserRepository } from "../../repositories";

export abstract class OAuth2PartyStrategy
  extends Strategy
  implements BaseStrategy {
  abstract readonly id: string;

  protected _verify?: VerifyFunction;

  protected constructor(
    options: StrategyOptions,
    userRepository: UserRepository
  ) {
    super(
      options,
      async (
        accessToken: string,
        refreshToken: string,
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
    if (req.query.accessToken) {
      const accessToken = req.query.accessToken as string;
      const refreshToken = req.query.refreshToken as string;
      const verified: VerifyCallback = (err, user, info) => {
        if (err) return this.error(err);
        if (user) this.success(user, info);
      };

      return this.userProfile(accessToken, (err, user, info) => {
        if (err) return verified(err, user, info);

        verified(err, user, info);

        // @ts-ignore
        this._verify?.(accessToken, refreshToken, user, verified);
      });
    }

    super.authenticate(req, options);
  }

  abstract userProfile(accessToken: string, done: VerifyCallback): void;
}
