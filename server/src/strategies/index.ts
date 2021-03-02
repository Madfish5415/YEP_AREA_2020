import { OAuth1Service, OAuth2Service } from "@area-common/service";
import passport from "passport";

import {
  AccountRepository,
  ServiceRepository,
  UserRepository,
} from "../repositories";
import { CredentialRepository } from "../repositories/credential";
import { AuthorizeStrategy } from "./authorize";
import { GoogleStrategy } from "./parties/google";
import { MicrosoftStrategy } from "./parties/microsoft";
import { OAuth1ServiceStrategy } from "./services/oauth1";
import { OAuth2ServiceStrategy } from "./services/oauth2";
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
};

export const usePartyStrategies = (userRepository: UserRepository): void => {
  passport.use("google-party", new GoogleStrategy(userRepository));
  passport.use("microsoft-party", new MicrosoftStrategy(userRepository));
};

export const useServiceStrategies = (
  serviceRepository: ServiceRepository,
  credentialRepository: CredentialRepository
): void => {
  const services = serviceRepository.list();

  for (const service of services) {
    if (service instanceof OAuth1Service) {
      passport.use(
        `${service.id}-service`,
        new OAuth1ServiceStrategy(
          service.id,
          service.options,
          credentialRepository
        )
      );
    }

    if (service instanceof OAuth2Service) {
      passport.use(
        `${service.id}-service`,
        new OAuth2ServiceStrategy(
          service.id,
          service.options,
          credentialRepository
        )
      );
    }
  }
};
