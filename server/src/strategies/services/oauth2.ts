import { User } from "@area-common/types";
import { Request } from "express";
import { Strategy, StrategyOptions, VerifyCallback } from "passport-oauth2";

import { CredentialRepository } from "../../repositories";

export class OAuth2ServiceStrategy extends Strategy {
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
      },
      async (
        req: Request,
        accessToken: string,
        refreshToken: string,
        user: User,
        done: VerifyCallback
      ) => {
        try {
          user = req.user as User;

          const filter = {
            userId: user.id,
            serviceId: req.serviceId,
          };
          const value = {
            accessToken,
            refreshToken,
          };

          const exists = await credentialRepository.exists(filter);

          if (!exists) {
            await credentialRepository.create({
              ...filter,
              value: JSON.stringify(value),
            });
          } else {
            await credentialRepository.update(filter, {
              value: JSON.stringify(value),
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
