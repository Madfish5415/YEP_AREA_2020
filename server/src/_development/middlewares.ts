import { Handler, NextFunction, Request, Response } from "express";

function _sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function sleepMiddleware(ms: number): Handler {
  return async function (req: Request, res: Response, next: NextFunction) {
    await _sleep(ms);

    next();
  };
}
