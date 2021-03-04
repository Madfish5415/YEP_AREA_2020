import { Router } from "express";
import passport from "passport";

import { ADMIN_ROUTE } from "../../constants";
import { adminUsersRouter } from "./users";

export const adminRouter = Router();

adminRouter.use(
  ADMIN_ROUTE,
  passport.authenticate("authorizeAdmin", {
    session: false,
    failWithError: true,
  })
);

adminRouter.use(ADMIN_ROUTE, adminUsersRouter);
