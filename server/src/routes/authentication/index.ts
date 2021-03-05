import { Router } from "express";

import { AUTHENTICATION_ROUTE } from "../../constants";
import { authenticationPartyRouter } from "./parties/[id]";
import { authenticationServiceRouter } from "./services/[id]";
import { authenticationSignIn } from "./signin";
import { authenticationSignUp } from "./signup";
import { authenticationVerify } from "./verify";

export const authenticationRouter = Router();

authenticationRouter.use(AUTHENTICATION_ROUTE, authenticationPartyRouter);
authenticationRouter.use(AUTHENTICATION_ROUTE, authenticationServiceRouter);
authenticationRouter.use(AUTHENTICATION_ROUTE, authenticationSignIn);
authenticationRouter.use(AUTHENTICATION_ROUTE, authenticationSignUp);
authenticationRouter.use(AUTHENTICATION_ROUTE, authenticationVerify);
