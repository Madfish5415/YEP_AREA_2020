import { Router } from "express";
import { listenRouter } from "./listen/listen";
import { Workflow } from "@area-common/types";

const workflowRoute = "/:id";

export const workflowRouter = Router();

declare global {
  namespace Express {
    interface Request {
      workflow: Workflow;
    }
  }
}

workflowRouter.use(workflowRoute, (req, res, next) => {
  const workflow = req.workflowRepository.list().find((workflow) => {
    return workflow.id === req.params.id;
  });

  if (!workflow) {
    return res.sendStatus(404);
  }

  req.workflow = workflow;

  return next();
});

workflowRouter.use(workflowRoute, listenRouter);

workflowRouter.get(workflowRoute, (req, res) => {
  return res.json({ data: req.workflow });
});
