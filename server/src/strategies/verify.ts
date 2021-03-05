import { Strategy, VerifiedCallback } from "passport-custom";

import {
  ACCOUNT_NOT_EXISTS_ERROR,
  ACCOUNT_VERIFIED_ERROR,
  BAD_REQUEST_ERROR,
  USER_NOT_EXISTS_ERROR,
  VERIFICATION_INVALID_ERROR,
} from "../constants";
import { AccountRepository, UserRepository } from "../repositories";

export class VerifyStrategy extends Strategy {
  constructor(
    accountRepository: AccountRepository,
    userRepository: UserRepository
  ) {
    super(async (req, done: VerifiedCallback) => {
      try {
        const email = req.body.username;
        const password = req.body.password;
        const verification = req.body.verification;

        if (!email || !password || !verification) {
          return done(BAD_REQUEST_ERROR);
        }

        const account = await accountRepository.read({ email });

        if (!account) {
          return done(ACCOUNT_NOT_EXISTS_ERROR);
        }

        if (account.verified) {
          return done(ACCOUNT_VERIFIED_ERROR);
        }

        const ok = await accountRepository.compareVerification(
          { email },
          verification
        );

        if (!ok) {
          return done(VERIFICATION_INVALID_ERROR);
        }

        const user = await userRepository.read(account.userId);

        if (!user) {
          return done(USER_NOT_EXISTS_ERROR);
        }

        await accountRepository.update({ email }, { verified: true });

        return done(null, user);
      } catch (e) {
        return done(e);
      }
    });
  }
}
