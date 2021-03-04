import { APIResponse, User, Workflow, WorkflowNode } from "@area-common/types";
import { Router } from "express";
import passport from "passport";
import { v4 } from "uuid";

import { BAD_REQUEST_ERROR, WORKFLOWS_ROUTE } from "../../constants";
import { hasAllKeysOf } from "../../utilities/type";
import { workflowRouter } from "./[id]";

export const workflowsRouter = Router();

workflowsRouter.use(
  WORKFLOWS_ROUTE,
  passport.authenticate("authorize", { session: false, failWithError: true })
);

workflowsRouter.use(WORKFLOWS_ROUTE, workflowRouter);

workflowsRouter.get(WORKFLOWS_ROUTE, async (req, res, next) => {
  try {
    const user = req.user as User;
    const workflows = await req.workflowRepository.list(user.id);

    const response: APIResponse = {
      status: 200,
      data: workflows,
    };

    return res.json(response);
  } catch (e) {
    return next(e);
  }
});

workflowsRouter.post(WORKFLOWS_ROUTE, async (req, res, next) => {
  try {
    const user = req.user as User;
    const workflow: Workflow = req.body;
    const [hasKeys] = hasAllKeysOf<Workflow>(workflow, [
      "name",
      "description",
      "active",
      "nodes",
      "starters",
    ]);

    if (!hasKeys) {
      return next(BAD_REQUEST_ERROR);
    }

    for (const wNode of workflow.nodes) {
      const [hasKeys] = hasAllKeysOf<WorkflowNode>(wNode, [
        "id",
        "name",
        "serviceId",
        "nodeId",
        "parameters",
        "condition",
        "nextNodes",
      ]);

      if (!hasKeys) {
        return next(BAD_REQUEST_ERROR);
      }
    }

    await req.runnerManager.create({ ...workflow, userId: user.id, id: v4() });

    const response: APIResponse = {
      status: 200,
      success: {
        name: "WORKFLOW_CREATE",
        message: "Workflow successfully created",
      },
    };

    return res.json(response);
  } catch (e) {
    return next(e);
  }
});
