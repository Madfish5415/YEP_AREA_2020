import { APIResponse } from "@area-common/types";
import { Router } from "express";
import passport, { AuthenticateOptions } from "passport";

import { AUTHENTICATION_SERVICE_CB_ROUTE } from "../../../../constants";

export const authenticationServiceCbRouter = Router();

authenticationServiceCbRouter.use(
  AUTHENTICATION_SERVICE_CB_ROUTE,
  passport.authenticate("authorize", { session: false, failWithError: true }),
  (req, res, next) => {
    passport.authenticate(req.serviceId, {
      callbackURL: req.query.state,
      session: false,
      failWithError: true,
    } as AuthenticateOptions)(req, res, next);
  },
  (req, res) => {
    const response: APIResponse = {
      status: 200,
      success: {
        name: "AUTHENTICATION_SERVICE_SUCCESS",
        message: "Successfully authenticated to the service",
      },
    };

    return res.json(response);
  }
);
