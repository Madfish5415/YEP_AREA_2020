import { RequestHandler } from "express";

import { AccountRepository } from "../repositories";

declare global {
  namespace Express {
    interface Request {
      accountRepository: AccountRepository;
    }
  }
}

export function accountMiddleware(
  repository: AccountRepository
): RequestHandler {
  return (req, res, next): void => {
    req.accountRepository = repository;

    return next();
  };
}
