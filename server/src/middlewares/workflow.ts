import { NextFunction, Request, Response } from "express";

import { WorkflowRepository } from "../repositories";

declare global {
  namespace Express {
    interface Request {
      workflowRepository: WorkflowRepository;
    }
  }
}

export function workflowMiddleware(repository: WorkflowRepository) {
  return (req: Request, res: Response, next: NextFunction): void => {
    req.workflowRepository = repository;

    return next();
  };
}
