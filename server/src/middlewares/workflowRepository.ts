import { RequestHandler } from "express";
import { WorkflowRepository } from "../repositories/workflow";

declare global {
  namespace Express {
    interface Request {
      workflowRepository: WorkflowRepository;
    }
  }
}

export function workflowRepository(
  repository: WorkflowRepository
): RequestHandler {
  return function (req, res, next) {
    req.workflowRepository = repository;

    return next();
  };
}
