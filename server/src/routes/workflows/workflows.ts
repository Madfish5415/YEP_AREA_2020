import { Router } from "express";
import { workflowRouter } from "./[id]/workflow";

const workflowsRoute = "/workflows";

export const workflowsRouter = Router();

workflowsRouter.use(workflowsRoute, workflowRouter);

workflowsRouter.get(workflowsRoute, (req, res) => {
  return res.json(req.workflowRepository.list());
});
