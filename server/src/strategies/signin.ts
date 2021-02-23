import { Strategy, VerifiedCallback } from "passport-custom";

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
        return done({});
      }

      const account = await accountRepository.read({ email });

      if (!account) {
        return done({});
      }

      if (!account.verified) {
        return done({});
      }

      const ok = await accountRepository.comparePassword({ email }, password);

      if (!ok) {
        return done({});
      }

      const user = await userRepository.read(account.userId);

      if (!user) {
        return done({});
      }

      return done(null, user);
    });
  }
}
