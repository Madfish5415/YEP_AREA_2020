import { User } from "@area-common/types";
import { Request } from "express";
import { Strategy, StrategyOptions, VerifyCallback } from "passport-oauth2";

import { CredentialRepository } from "../../repositories/credential";

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
          const filter = {
            userId: user.id,
            serviceId: req.params.id,
          };
          const exists = await credentialRepository.exists(filter);

          if (exists) {
            await credentialRepository.update(filter, {
              value: JSON.stringify({
                accessToken,
                refreshToken,
              }),
            });
          } else {
            await credentialRepository.create({
              ...filter,
              value: JSON.stringify({
                accessToken,
                refreshToken,
              }),
            });
          }

          return done(null);
        } catch (e) {
          return done(e);
        }
      }
    );

    this.id = id;
  }
}
