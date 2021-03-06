import { APIResponse, Workflow, WorkflowNode } from "@area-common/types";
import { Router } from "express";

import {
  BAD_REQUEST_ERROR,
  WORKFLOW_NOT_EXISTS,
  WORKFLOW_ROUTE,
} from "../../../constants";
import { hasAKeysOf } from "../../../utilities/type";

export const workflowRouter = Router();

workflowRouter.use(WORKFLOW_ROUTE, async (req, res, next) => {
  try {
    const id = req.params.id as string;
    const workflow = await req.workflowRepository.exists(id);

    if (!workflow) {
      return next(WORKFLOW_NOT_EXISTS);
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
    const partial: Partial<Workflow> = req.body;
    const [hasKeys] = hasAKeysOf<Workflow>(partial, [
      "name",
      "description",
      "active",
      "nodes",
      "starters",
    ]);

    if (!hasKeys) {
      return next(BAD_REQUEST_ERROR);
    }

    if (partial.nodes) {
      for (const wNode of partial.nodes) {
        const [hasKeys] = hasAKeysOf<WorkflowNode>(wNode, [
          "id",
          "name",
          "label",
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
    }

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
