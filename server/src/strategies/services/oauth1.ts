import { User } from "@area-common/types";
import { Request } from "express";
import { Strategy, StrategyOptions, VerifyCallback } from "passport-oauth1";

import { CredentialRepository } from "../../repositories/credential";
import { OAuth1StrategyStore } from "../store/oauth1";

export class OAuth1ServiceStrategy extends Strategy {
  readonly id: string;

  constructor(
    id: string,
    options: StrategyOptions,
    credentialRepository: CredentialRepository
  ) {
    super(
      {
        ...options,
        passReqToCallback: true,
        requestTokenStore: new OAuth1StrategyStore(),
      },
      async (
        req: Request,
        token: string,
        tokenSecret: string,
        user: User,
        done: VerifyCallback
      ) => {
        try {
          user = req.user as User;

          const filter = {
            userId: user.id,
            serviceId: req.serviceId,
          };

          const exists = await credentialRepository.exists(filter);

          if (exists) {
            await credentialRepository.update(filter, {
              value: JSON.stringify({
                token,
                tokenSecret,
              }),
            });
          } else {
            await credentialRepository.create({
              ...filter,
              value: JSON.stringify({
                token,
                tokenSecret,
              }),
            });
          }

          return done(null, user);
        } catch (e) {
          return done(e);
        }
      }
    );

    this.id = id;
  }
}
