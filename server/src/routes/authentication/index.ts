import { Router } from "express";

import { AUTHENTICATION_ROUTE } from "../../constants";
import { authenticationSignIn } from "./signin";
import { authenticationSignUp } from "./signup";
import { authenticationVerify } from "./verify";

export const authenticationRouter = Router();

authenticationRouter.use(AUTHENTICATION_ROUTE, authenticationSignIn);
authenticationRouter.use(AUTHENTICATION_ROUTE, authenticationSignUp);
authenticationRouter.use(AUTHENTICATION_ROUTE, authenticationVerify);
