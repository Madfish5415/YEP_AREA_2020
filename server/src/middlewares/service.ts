import { RequestHandler } from "express";

import { ServiceRepository } from "../repositories";

declare global {
  namespace Express {
    interface Request {
      serviceRepository: ServiceRepository;
    }
  }
}

export function serviceMiddleware(
  repository: ServiceRepository
): RequestHandler {
  return (req, res, next): void => {
    req.serviceRepository = repository;

    return next();
  };
}
