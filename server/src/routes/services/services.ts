import { Router } from "express";
import { serviceRouter } from "./[id]/service";

const servicesRoute = "/services";

export const servicesRouter = Router();

servicesRouter.use(servicesRoute, serviceRouter);

servicesRouter.get(servicesRoute, (req, res) => {
  return res.json(req.serviceRepository.list());
});
