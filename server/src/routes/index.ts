import { Router } from "express";
import {servicesRouter} from "./services/services";
import {workflowsRouter} from "./workflows/workflows";
import {usersRouter} from "./users/users";

export const indexRouter = Router();

indexRouter.use(servicesRouter);
indexRouter.use(workflowsRouter);
indexRouter.use(usersRouter);
