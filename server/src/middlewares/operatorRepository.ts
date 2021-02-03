import { RequestHandler } from "express";
import { OperatorRepository } from "../repositories/operator";

declare global {
  namespace Express {
    interface Request {
      operatorRepository: OperatorRepository;
    }
  }
}

export function operatorRepository(
  repository: OperatorRepository
): RequestHandler {
  return function (req, res, next) {
    req.operatorRepository = repository;

    return next();
  };
}
