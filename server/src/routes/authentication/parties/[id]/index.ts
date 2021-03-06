import { Router } from "express";
import passport, { AuthenticateOptions } from "passport";

import { AUTHENTICATION_PARTY_ROUTE } from "../../../../constants";
import { authenticationPartyCbRouter } from "./callback";

export const authenticationPartyRouter = Router();

declare global {
  namespace Express {
    interface Request {
      partyId: string;
    }
  }
}

authenticationPartyRouter.use(AUTHENTICATION_PARTY_ROUTE, (req, res, next) => {
  req.partyId = req.params.id;

  return next();
});

authenticationPartyRouter.use(
  AUTHENTICATION_PARTY_ROUTE,
  authenticationPartyCbRouter
);

authenticationPartyRouter.use(AUTHENTICATION_PARTY_ROUTE, (req, res, next) => {
  passport.authenticate(`${req.partyId}-party`, {
    callbackURL: req.query.callbackURL,
    state: req.query.callbackURL,
    session: false,
    failWithError: true,
  } as AuthenticateOptions)(req, res, next);
});
