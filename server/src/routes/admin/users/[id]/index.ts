import { APIResponse, User } from "@area-common/types";
import { Router } from "express";

import {
  ADMIN_USER_ROUTE,
  BAD_REQUEST_ERROR,
  USER_NOT_EXISTS_ERROR,
} from "../../../../constants";
import { hasAKeysOf } from "../../../../utilities/type";
import { adminAccountRouter } from "./account";

export const adminUserRouter = Router();

adminUserRouter.use(ADMIN_USER_ROUTE, adminAccountRouter);

adminUserRouter.use(ADMIN_USER_ROUTE, async (req, res, next) => {
  try {
    const id = req.params.id as string;
    const user = await req.userRepository.exists(id);

    if (!user) {
      return next(USER_NOT_EXISTS_ERROR);
    }

    return next();
  } catch (e) {
    return next(e);
  }
});

adminUserRouter.get(ADMIN_USER_ROUTE, async (req, res, next) => {
  try {
    const id = req.params.id as string;
    const user = await req.userRepository.read(id);

    const response: APIResponse = {
      status: 200,
      data: user,
    };

    return res.json(response);
  } catch (e) {
    return next(e);
  }
});

adminUserRouter.post(ADMIN_USER_ROUTE, async (req, res, next) => {
  try {
    const id = req.params.id as string;
    const partial: Partial<User> = req.body;
    const [hasKeys] = hasAKeysOf<User>(partial, [
      "username",
      "firstName",
      "lastName",
    ]);

    if (!hasKeys) {
      return next(BAD_REQUEST_ERROR);
    }

    const user = await req.userRepository.update(id, partial);

    const response: APIResponse = {
      status: 200,
      data: user,
    };

    return res.json(response);
  } catch (e) {
    return next(e);
  }
});

adminUserRouter.delete(ADMIN_USER_ROUTE, async (req, res, next) => {
  try {
    const id = req.params.id as string;

    await req.accountRepository.delete({ userId: id });
    await req.credentialRepository.deleteAll(id);
    await req.workflowRepository.deleteAll(id);
    await req.userRepository.delete(id);

    const response: APIResponse = {
      status: 200,
      success: {
        name: "USER_DELETE",
        message: "User successfully deleted",
      },
    };

    return res.json(response);
  } catch (e) {
    return next(e);
  }
});
