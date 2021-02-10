import { ServiceRepository } from "../repositories/service";
import { RequestHandler } from "express";

declare global {
  namespace Express {
    interface Request {
      serviceRepository: ServiceRepository;
    }
  }
}

export function serviceRepository(
  repository: ServiceRepository
): RequestHandler {
  return function (req, res, next) {
    req.serviceRepository = repository;

    return next();
  };
}
