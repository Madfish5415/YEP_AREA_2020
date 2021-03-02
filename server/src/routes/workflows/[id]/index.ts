import { APIResponse, Workflow } from "@area-common/types";
import { Router } from "express";

import { BAD_REQUEST_ERROR, WORKFLOW_ROUTE } from "../../../constants";

export const workflowRouter = Router();

workflowRouter.use(WORKFLOW_ROUTE, async (req, res, next) => {
  try {
    const id = req.params.id as string;
    const workflow = await req.workflowRepository.exists(id);

    if (!workflow) {
      const response: APIResponse = {
        status: 404,
        failure: {
          name: "WORKFLOW_NOT_EXISTS",
          message: "Workflow doesn't exist",
        },
      };

      return res.json(response);
    }

    return next();
  } catch (e) {
    return next(e);
  }
});

workflowRouter.get(WORKFLOW_ROUTE, async (req, res, next) => {
  try {
    const id = req.params.id as string;

    const workflow = await req.workflowRepository.read(id);

    const response: APIResponse = {
      status: 200,
      data: workflow,
    };

    return res.json(response);
  } catch (e) {
    return next(e);
  }
});

workflowRouter.post(WORKFLOW_ROUTE, async (req, res, next) => {
  try {
    const id = req.params.id as string;
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

    const partial: Partial<Workflow> = data.workflow;
    const workflow = await req.runnerManager.update(id, partial);

    const response: APIResponse = {
      status: 200,
      data: workflow,
    };

    return res.json(response);
  } catch (e) {
    return next(e);
  }
});

workflowRouter.delete(WORKFLOW_ROUTE, async (req, res, next) => {
  try {
    const id = req.params.id as string;

    await req.runnerManager.delete(id);

    const response: APIResponse = {
      status: 200,
      success: {
        name: "WORKFLOW_DELETE",
        message: "Workflow successfully deleted",
      },
    };

    return res.json(response);
  } catch (e) {
    return next(e);
  }
});
