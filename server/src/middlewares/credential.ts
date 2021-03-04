import { RequestHandler } from "express";

import { CredentialRepository } from "../repositories";

declare global {
  namespace Express {
    interface Request {
      credentialRepository: CredentialRepository;
    }
  }
}

export function credentialMiddleware(
  repository: CredentialRepository
): RequestHandler {
  return (req, res, next): void => {
    req.credentialRepository = repository;

    return next();
  };
}
