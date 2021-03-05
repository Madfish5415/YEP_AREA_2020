import { APIResponse } from "@area-common/types";
import { Router } from "express";

import {
  SERVICE_NODE_NOT_EXISTS,
  SERVICE_NODE_ROUTE,
} from "../../../constants";

export const serviceNodeRouter = Router();

declare global {
  namespace Express {
    interface Request {
      nodeId: string;
    }
  }
}

serviceNodeRouter.use(SERVICE_NODE_ROUTE, async (req, res, next) => {
  try {
    const id = req.params.id as string;
    const node = await req.serviceRepository.existsNode(req.serviceId, id);

    if (!node) {
      return next(SERVICE_NODE_NOT_EXISTS);
    }

    req.nodeId = id;

    return next();
  } catch (e) {
    return e;
  }
});

serviceNodeRouter.get(SERVICE_NODE_ROUTE, async (req, res, next) => {
  try {
    const node = await req.serviceRepository.readNode(
      req.serviceId,
      req.nodeId
    );

    const response: APIResponse = {
      status: 200,
      data: node,
    };

    return res.json(response);
  } catch (e) {
    return next(e);
  }
});
