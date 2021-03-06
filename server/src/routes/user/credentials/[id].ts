import { APIResponse, User } from "@area-common/types";
import { Router } from "express";

import {
  CREDENTIAL_NOT_EXISTS_ERROR,
  USER_CREDENTIAL_ROUTE,
} from "../../../constants";

export const userCredentialRouter = Router();

userCredentialRouter.use(USER_CREDENTIAL_ROUTE, async (req, res, next) => {
  try {
    const filter = {
      userId: (req.user as User).id,
      serviceId: req.params.id,
    };
    const exists = await req.credentialRepository.exists(filter);

    if (!exists) {
      return next(CREDENTIAL_NOT_EXISTS_ERROR);
    }

    return next();
  } catch (e) {
    return next(e);
  }
});

userCredentialRouter.get(USER_CREDENTIAL_ROUTE, async (req, res, next) => {
  try {
    const response: APIResponse = {
      status: 200,
      success: {
        name: "CREDENTIAL_EXISTS",
        message: "Credential exists",
      },
    };

    return res.json(response);
  } catch (e) {
    return next(e);
  }
});

userCredentialRouter.delete(USER_CREDENTIAL_ROUTE, async (req, res, next) => {
  try {
    const filter = {
      userId: (req.user as User).id,
      serviceId: req.params.id,
    };

    await req.credentialRepository.delete(filter);

    const response: APIResponse = {
      status: 200,
      success: {
        name: "CREDENTIAL_DELETED",
        message: "Credential successfully deleted",
      },
    };

    return res.json(response);
  } catch (e) {
    return next(e);
  }
});
