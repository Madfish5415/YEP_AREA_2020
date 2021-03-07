import { APIResponse, User } from "@area-common/types";
import { Router } from "express";
import passport from "passport";

import { BAD_REQUEST_ERROR, USER_ROUTE } from "../../constants";
import { hasAKeysOf } from "../../utilities/type";
import { userAccountRouter } from "./account";
import { userCredentialsRouter } from "./credentials";

export const userRouter = Router();

userRouter.use(
  USER_ROUTE,
  passport.authenticate("authorize", { session: false, failWithError: true })
);

userRouter.use(USER_ROUTE, userAccountRouter);
userRouter.use(USER_ROUTE, userCredentialsRouter);

userRouter.get(USER_ROUTE, async (req, res, next) => {
  try {
    const user = req.user as User;

    const response: APIResponse = {
      status: 200,
      data: user,
    };

    return res.json(response);
  } catch (e) {
    return next(e);
  }
});

userRouter.post(USER_ROUTE, async (req, res, next) => {
  try {
    const id = (req.user as User).id;
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

userRouter.delete(USER_ROUTE, async (req, res, next) => {
  try {
    const id = (req.user as User).id;

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
