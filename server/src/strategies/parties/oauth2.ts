import {Any, User} from "@area-common/types";
import { Request } from "express";
import { Strategy, StrategyOptions, VerifyCallback } from "passport-oauth2";

import { UserRepository } from "../../repositories";

export abstract class OAuth2PartyStrategy extends Strategy {
  abstract readonly id: string;

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
      this.userProfile(req.query.accessToken as string, (err, user, info) => {
        if (err) {
          return this.error(err);
        }

        if (user) {
          return this.success(user, info);
        }
      });
    }

    super.authenticate(req, options);
  }

  abstract userProfile(accessToken: string, done: VerifyCallback): void;
}
