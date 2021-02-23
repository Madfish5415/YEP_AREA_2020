import passport from "passport";
import { AuthorizeStrategy } from "./authorize";
import { AccountRepository, UserRepository } from "../repositories";
import { GoogleStrategy } from "./oauth2/google";
import { MicrosoftStrategy } from "./oauth2/microsoft";
import { SignInStrategy } from "./signin";
import { SignUpStrategy } from "./signup";
import { VerifyStrategy } from "./verify";

export const useStrategies = (
  accountRepository: AccountRepository,
  userRepository: UserRepository
): void => {
  passport.use("authorize", new AuthorizeStrategy(userRepository));
  passport.use("signin", new SignInStrategy(accountRepository, userRepository));
  passport.use("signup", new SignUpStrategy(accountRepository, userRepository));
  passport.use("verify", new VerifyStrategy(accountRepository, userRepository));
  passport.use("google", new GoogleStrategy(userRepository));
  passport.use("microsoft", new MicrosoftStrategy(userRepository));
};
