import { Router } from "express";
import passport, { AuthenticateOptions } from "passport";

import { AUTHENTICATION_SERVICE_ROUTE } from "../../../../constants";
import { authenticationServiceCbRouter } from "./callback";

export const authenticationServiceRouter = Router();

declare global {
  namespace Express {
    interface Request {
      serviceId: string;
    }
  }
}

authenticationServiceRouter.use(
  AUTHENTICATION_SERVICE_ROUTE,
  (req, res, next) => {
    req.serviceId = `${req.params.id}-service`;

    return next();
  }
);

authenticationServiceRouter.use(
  AUTHENTICATION_SERVICE_ROUTE,
  authenticationServiceCbRouter
);

authenticationServiceRouter.use(
  AUTHENTICATION_SERVICE_ROUTE,
  (req, res, next) => {
    passport.authenticate(req.serviceId, {
      callbackURL: req.query.callbackURL,
      session: false,
      failWithError: true,
    } as AuthenticateOptions)(req, res, next);
  }
);
