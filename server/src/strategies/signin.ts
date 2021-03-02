import { Strategy, VerifiedCallback } from "passport-custom";

import {
  ACCOUNT_NOT_EXISTS_ERROR,
  ACCOUNT_NOT_VERIFIED_ERROR,
  BAD_REQUEST_ERROR,
  USER_NOT_EXISTS_ERROR,
} from "../constants";
import { AccountRepository, UserRepository } from "../repositories";

export class SignInStrategy extends Strategy {
  constructor(
    accountRepository: AccountRepository,
    userRepository: UserRepository
  ) {
    super(async (req, done: VerifiedCallback) => {
      const email = req.body.email;
      const password = req.body.password;

      if (!email || !password) {
        return done(BAD_REQUEST_ERROR);
      }

      const account = await accountRepository.read({ email });

      if (!account) {
        return done(ACCOUNT_NOT_EXISTS_ERROR);
      }

      const ok = await accountRepository.comparePassword({ email }, password);

      if (!ok) {
        return done(ACCOUNT_NOT_EXISTS_ERROR);
      }

      if (!account.verified) {
        return done(ACCOUNT_NOT_VERIFIED_ERROR);
      }

      const user = await userRepository.read(account.userId);

      if (!user) {
        return done(USER_NOT_EXISTS_ERROR);
      }

      return done(null, user);
    });
  }
}
