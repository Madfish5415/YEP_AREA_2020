import { Account, APIResponse, User } from "@area-common/types";
import { Router } from "express";

import {
  ACCOUNT_NOT_EXISTS_ERROR,
  BAD_REQUEST_ERROR,
  USER_ACCOUNT_ROUTE,
} from "../../constants";
import { hasAKeysOf } from "../../utilities/type";

export const userAccountRouter = Router();

userAccountRouter.use(USER_ACCOUNT_ROUTE, async (req, res, next) => {
  try {
    const id = (req.user as User).id;
    const account = await req.accountRepository.exists({ userId: id });

    if (!account) {
      return next(ACCOUNT_NOT_EXISTS_ERROR);
    }

    return next();
  } catch (e) {
    return next(e);
  }
});

userAccountRouter.get(USER_ACCOUNT_ROUTE, async (req, res, next) => {
  try {
    const id = (req.user as User).id;
    const account = await req.accountRepository.read({ userId: id });

    const response: APIResponse = {
      status: 200,
      data: account,
    };

    return res.json(response);
  } catch (e) {
    return next(e);
  }
});

userAccountRouter.post(USER_ACCOUNT_ROUTE, async (req, res, next) => {
  try {
    const id = (req.user as User).id;
    const partial: Partial<Account> = req.body;
    const [hasKeys] = hasAKeysOf<Account>(partial, ["email", "password"]);

    if (!hasKeys) {
      return next(BAD_REQUEST_ERROR);
    }

    const account = await req.accountRepository.update({ userId: id }, partial);

    const response: APIResponse = {
      status: 200,
      data: account,
    };

    return res.json(response);
  } catch (e) {
    return next(e);
  }
});
