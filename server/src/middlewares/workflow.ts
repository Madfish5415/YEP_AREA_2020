import { RequestHandler } from "express";

import { WorkflowRepository } from "../repositories";

declare global {
  namespace Express {
    interface Request {
      workflowRepository: WorkflowRepository;
    }
  }
}

export function workflowMiddleware(
  repository: WorkflowRepository
): RequestHandler {
  return (req, res, next): void => {
    req.workflowRepository = repository;

    return next();
  };
}
