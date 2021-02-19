import { Account, User } from "@area-common/types";
import { Strategy, VerifiedCallback } from "passport-custom";
import { v4 } from "uuid";

import { AccountRepository, UserRepository } from "../repositories";

export class SignUpStrategy extends Strategy {
  constructor(
    accountRepository: AccountRepository,
    userRepository: UserRepository
  ) {
    super(async (req, done: VerifiedCallback) => {
      const email = req.body.username;
      const password = req.body.password;
      const confirmPassword = req.body.confirmPassword;
      const username = req.body.username;
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;

      if (!email || !password || !confirmPassword || !username) {
        return done({});
      }

      if (password !== confirmPassword) {
        return done({});
      }

      const exists = await accountRepository.exists({ email });

      if (exists) {
        return done({});
      }

      const user: User = {
        id: v4(),
        username,
        firstName,
        lastName,
      };

      await userRepository.create(user);

      const account: Account = {
        userId: user.id,
        id: v4(),
        email,
        password,
        verified: true,
      };

      await accountRepository.create(account);

      return done(null, account);
    });
  }
}
