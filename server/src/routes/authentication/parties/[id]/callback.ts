import { APIResponse, User } from "@area-common/types";
import { Router } from "express";
import jwt from "jsonwebtoken";
import passport, { AuthenticateOptions } from "passport";

import {
  AUTHENTICATION_PARTY_CB_ROUTE,
  AUTHORIZE_SECRET,
} from "../../../../constants";

export const authenticationPartyCbRouter = Router();

authenticationPartyCbRouter.use(
  AUTHENTICATION_PARTY_CB_ROUTE,
  (req, res, next) => {
    passport.authenticate(`${req.partyId}-party`, {
      callbackURL: req.query.state,
      session: false,
      failWithError: true,
    } as AuthenticateOptions)(req, res, next);
  },
  (req, res) => {
    const user = req.user as User;
    const token = jwt.sign(user.id, AUTHORIZE_SECRET);

    const response: APIResponse = {
      status: 200,
      data: { token },
    };

    return res.json(response);
  }
);
