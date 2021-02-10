import { Router } from "express";
import { servicesRouter } from "./services/services";
import {alertRouter} from "./alert/alert";

export const indexRouter = Router();

indexRouter.use(alertRouter);
indexRouter.use(servicesRouter);
