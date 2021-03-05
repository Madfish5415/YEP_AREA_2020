import { APIResponse } from "@area-common/types";
import { Router } from "express";

import { SERVICE_NOT_EXISTS_ERROR, SERVICE_ROUTE } from "../../../constants";
import { serviceNodeRouter } from "./[id]";

export const serviceRouter = Router();

declare global {
  namespace Express {
    interface Request {
      serviceId: string;
    }
  }
}

serviceRouter.use(SERVICE_ROUTE, async (req, res, next) => {
  try {
    const id = req.params.id as string;
    const service = await req.serviceRepository.exists(id);

    if (!service) {
      return next(SERVICE_NOT_EXISTS_ERROR);
    }

    req.serviceId = id;

    return next();
  } catch (e) {
    return e;
  }
});

serviceRouter.use(SERVICE_ROUTE, serviceNodeRouter);

serviceRouter.get(SERVICE_ROUTE, async (req, res, next) => {
  try {
    const service = await req.serviceRepository.read(req.serviceId);

    const response: APIResponse = {
      status: 200,
      data: service,
    };

    return res.json(response);
  } catch (e) {
    return next(e);
  }
});
