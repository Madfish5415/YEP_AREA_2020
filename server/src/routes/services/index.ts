import { APIResponse } from "@area-common/types";
import { Router } from "express";

import { SERVICES_ROUTE } from "../../constants";
import { serviceRouter } from "./[id]";

export const servicesRouter = Router();

servicesRouter.use(SERVICES_ROUTE, serviceRouter);

servicesRouter.get(SERVICES_ROUTE, async (req, res) => {
  const services = req.serviceRepository.list();

  const response: APIResponse = {
    status: 200,
    data: services,
  };

  return res.json(response);
});
