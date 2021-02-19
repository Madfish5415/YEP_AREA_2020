import { Router } from "express";

import { API_ROUTE } from "../constants";
import { authenticationRouter } from "./authentication";

export const apiRouter = Router();

apiRouter.use(API_ROUTE, authenticationRouter);
