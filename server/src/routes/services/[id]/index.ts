import { APIResponse } from "@area-common/types";
import { Router } from "express";

import { SERVICE_ROUTE } from "../../../constants";

export const serviceRouter = Router();

serviceRouter.use(SERVICE_ROUTE, async (req, res, next) => {
  const id = req.params.id as string;
  const service = await req.serviceRepository.exists(id);

  if (!service) {
    const response: APIResponse = {
      status: 404,
      failure: {
        name: "SERVICE_NOT_EXISTS",
        message: "Service doesn't exist",
      },
    };

    return res.json(response);
  }

  return next();
});

serviceRouter.get(SERVICE_ROUTE, async (req, res) => {
  const id = req.params.id as string;

  const service = await req.serviceRepository.read(id);

  const response: APIResponse = {
    status: 200,
    data: service,
  };

  return res.json(response);
});
