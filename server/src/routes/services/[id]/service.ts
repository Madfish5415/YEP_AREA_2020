import { Router } from "express";
import { Service } from "@area-common/types";

const serviceRoute = "/:id";

export const serviceRouter = Router();

declare global {
  namespace Express {
    interface Request {
      service: Service;
    }
  }
}

serviceRouter.use(serviceRoute, (req, res, next) => {
  const service = req.serviceRepository.list().find((service) => {
    return service.id === req.params.id;
  });

  if (!service) {
    return res.sendStatus(404);
  }

  req.service = service;

  return next();
});

serviceRouter.get(serviceRoute, (req, res) => {
  return res.json({ data: req.service });
});
