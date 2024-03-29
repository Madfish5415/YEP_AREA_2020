import { Account, User } from "@area-common/types";
import { Strategy, VerifiedCallback } from "passport-custom";
import { v4 } from "uuid";

import { ACCOUNT_EXISTS_ERROR, BAD_REQUEST_ERROR } from "../constants";
import { AccountRepository, UserRepository } from "../repositories";

export class SignUpStrategy extends Strategy {
  constructor(
    accountRepository: AccountRepository,
    userRepository: UserRepository
  ) {
    super(async (req, done: VerifiedCallback) => {
      try {
        const email = req.body.email;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        const username = req.body.username;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;

        if (!email || !password || !confirmPassword || !username) {
          return done(BAD_REQUEST_ERROR);
        }

        if (password !== confirmPassword) {
          return done(BAD_REQUEST_ERROR);
        }

        const exists = await accountRepository.exists({ email });

        if (exists) {
          return done(ACCOUNT_EXISTS_ERROR);
        }

        const userId = v4();
        const user: User = {
          id: userId,
          username,
          firstName,
          lastName,
          administrator: false,
        };

        await userRepository.create(user);

        const accountId = v4();
        const accountVerification = v4();
        const account: Account = {
          userId: user.id,
          id: accountId,
          email,
          password,
          verified: true,
          verification: accountVerification,
        };

        await accountRepository.create(account);

        return done(null, user);
      } catch (e) {
        return done(e);
      }
    });
  }
}
