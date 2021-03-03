import { APIResponse } from "@area-common/types";
import { Router } from "express";

import { ADMIN_USERS_ROUTE } from "../../../constants";
import { adminUserRouter } from "./[id]";

export const adminUsersRouter = Router();

adminUsersRouter.use(ADMIN_USERS_ROUTE, adminUserRouter);

adminUsersRouter.get(ADMIN_USERS_ROUTE, async (req, res, next) => {
  try {
    const users = await req.userRepository.list();

    const response: APIResponse = {
      status: 200,
      data: users,
    };

    return res.json(response);
  } catch (e) {
    return next(e);
  }
});
