import { Router } from "express";

import { API_ROUTE } from "../constants";
import { authenticationRouter } from "./authentication";
import { workflowsRouter } from "./workflows";

export const apiRouter = Router();

apiRouter.use(API_ROUTE, authenticationRouter);
apiRouter.use(API_ROUTE, workflowsRouter);
