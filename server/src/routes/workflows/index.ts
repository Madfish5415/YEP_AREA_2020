import { APIResponse, User, Workflow } from "@area-common/types";
import { Router } from "express";
import passport from "passport";
import { v4 } from "uuid";

import { BAD_REQUEST_ERROR, WORKFLOWS_ROUTE } from "../../constants";
import { hasMissingKeys } from "../../utilities/type";
import { workflowRouter } from "./[id]";

export const workflowsRouter = Router();

workflowsRouter.use(WORKFLOWS_ROUTE, passport.authenticate("authorize"));
workflowsRouter.use(WORKFLOWS_ROUTE, workflowRouter);

workflowsRouter.get(WORKFLOWS_ROUTE, async (req, res) => {
  const user = req.user as User;
  const workflows = await req.workflowRepository.list(user.id);

  const response: APIResponse = {
    status: 200,
    data: workflows,
  };

  return res.json(response);
});

workflowsRouter.post(WORKFLOWS_ROUTE, async (req, res) => {
  const user = req.user as User;
  const data = req.body.data;

  if (!data) {
    const response: APIResponse = {
      status: 400,
      failure: {
        ...BAD_REQUEST_ERROR,
      },
    };

    return res.json(response);
  }

  const workflow: Workflow = data.workflow;
  const missingKeys = hasMissingKeys<Workflow>(workflow, [
    "name",
    "description",
    "active",
    "actions",
    "reactions",
  ]);

  if (missingKeys.length) {
    const response: APIResponse = {
      status: 400,
      failure: {
        ...BAD_REQUEST_ERROR,
      },
    };

    return res.json(response);
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
});
