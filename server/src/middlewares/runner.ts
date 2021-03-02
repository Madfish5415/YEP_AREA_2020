import { RequestHandler } from "express";

import { RunnerManager } from "../managers";

declare global {
  namespace Express {
    interface Request {
      runnerManager: RunnerManager;
    }
  }
}

export function runnerMiddleware(manager: RunnerManager): RequestHandler {
  return (req, res, next): void => {
    req.runnerManager = manager;

    return next();
  };
}
