import { APIResponse, User } from "@area-common/types";
import { Router } from "express";

import { USER_CREDENTIALS_ROUTE } from "../../../constants";
import { userCredentialRouter } from "./[id]";

export const userCredentialsRouter = Router();

userCredentialsRouter.use(USER_CREDENTIALS_ROUTE, userCredentialRouter);

userCredentialsRouter.get(USER_CREDENTIALS_ROUTE, async (req, res, next) => {
  try {
    const id = (req.user as User).id;
    const credentials = await req.credentialRepository.list(id);
    const services = credentials.map((credential) => {
      return credential.serviceId;
    });

    const response: APIResponse = {
      status: 200,
      data: services,
    };

    return res.json(response);
  } catch (e) {
    return next(e);
  }
});
