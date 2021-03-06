import { Router } from "express";
import passport, { AuthenticateOptions } from "passport";

import { AUTHENTICATION_SERVICE_ROUTE } from "../../../../constants";
import { authenticationServiceCbRouter } from "./callback";
import { authenticationServicePvRouter } from "./provide";

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
    req.serviceId = req.params.id;

    return next();
  }
);

authenticationServiceRouter.use(
  AUTHENTICATION_SERVICE_ROUTE,
  authenticationServiceCbRouter
);

authenticationServiceRouter.use(
  AUTHENTICATION_SERVICE_ROUTE,
  authenticationServicePvRouter
);

authenticationServiceRouter.use(
  AUTHENTICATION_SERVICE_ROUTE,
  (req, res, next) => {
    passport.authenticate(`${req.serviceId}-service`, {
      callbackURL: req.query.callbackURL,
      state: req.query.callbackURL,
      session: false,
      failWithError: true,
    } as AuthenticateOptions)(req, res, next);
  }
);
