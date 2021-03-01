import { Router } from "express";
import passport, { AuthenticateOptions } from "passport";

import { AUTHENTICATION_PARTY_ROUTE } from "../../../constants";

export const authenticationParty = Router();

authenticationParty.use(AUTHENTICATION_PARTY_ROUTE, (req, res, next) => {
  passport.authenticate(
    req.query.id as string,
    {
      callbackURL: req.query.callbackURL,
      session: false,
    } as AuthenticateOptions
  )(req, res, next);
});
