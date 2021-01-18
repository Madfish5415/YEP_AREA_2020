import { Router } from "express";
import {usersRouter} from "./users/users";

export const indexRouter = Router();

indexRouter.use(usersRouter);
