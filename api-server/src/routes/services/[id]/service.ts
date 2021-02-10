import { Router } from "express";
import { services } from "../../../constants/services";

const serviceRoute = "/:id";

export const serviceRouter = Router();

serviceRouter.get(serviceRoute, (req, res) => {
  const service = services().find((service) => {
    return service.id === req.params.id;
  });

  if (!service) {
    return res.status(404).json({ error: "Service not found" });
  }

  return res.json({ data: service });
});
