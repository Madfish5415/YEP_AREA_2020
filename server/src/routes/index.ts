import { Router } from "express";

import { API_ROUTE } from "../constants";
import { adminRouter } from "./admin";
import { authenticationRouter } from "./authentication";
import { servicesRouter } from "./services";
import { userRouter } from "./user";
import { workflowsRouter } from "./workflows";

export const apiRouter = Router();

apiRouter.use(API_ROUTE, adminRouter);
apiRouter.use(API_ROUTE, authenticationRouter);
apiRouter.use(API_ROUTE, servicesRouter);
apiRouter.use(API_ROUTE, userRouter);
apiRouter.use(API_ROUTE, workflowsRouter);
