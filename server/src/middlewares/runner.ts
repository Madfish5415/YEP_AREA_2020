import { NextFunction, Request, Response } from "express";

import { RunnerManager } from "../managers";

declare global {
  namespace Express {
    interface Request {
      runnerManager: RunnerManager;
    }
  }
}

export function runnerMiddleware(manager: RunnerManager) {
  return (req: Request, res: Response, next: NextFunction): void => {
    req.runnerManager = manager;

    return next();
  };
}
