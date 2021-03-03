import {
  APIResponse,
  User,
  Workflow,
  WorkflowAction,
  WorkflowExecution,
  WorkflowReaction,
} from "@area-common/types";
import { Router } from "express";
import passport from "passport";
import { v4 } from "uuid";

import { BAD_REQUEST_ERROR, WORKFLOWS_ROUTE } from "../../constants";
import { hasMissingKeys } from "../../utilities/type";
import { workflowRouter } from "./[id]";

export const workflowsRouter = Router();

workflowsRouter.use(
  WORKFLOWS_ROUTE,
  passport.authenticate("authorize", { session: false, failWithError: true })
);

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

workflowsRouter.post(WORKFLOWS_ROUTE, async (req, res, next) => {
  try {
    const user = req.user as User;
    const workflow: Workflow = req.body;
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

    for (const wAction of workflow.actions) {
      const missingKeys = hasMissingKeys<WorkflowAction>(wAction, [
        "id",
        "name",
        "serviceId",
        "actionId",
        "parameters",
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
    }

    for (const wReaction of workflow.reactions) {
      const missingKeys = hasMissingKeys<WorkflowReaction>(wReaction, [
        "id",
        "name",
        "serviceId",
        "reactionId",
        "parameters",
        "condition",
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
    }

    if (workflow.executions) {
      for (const wExecution of workflow.executions) {
        const missingKeys = hasMissingKeys<WorkflowExecution>(wExecution, [
          "id",
          "name",
          "executionId",
          "parameters",
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
