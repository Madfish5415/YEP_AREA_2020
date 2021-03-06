import { RequestHandler } from "express";

import { UserRepository } from "../repositories";

declare global {
  namespace Express {
    interface Request {
      userRepository: UserRepository;
    }
  }
}

export function userMiddleware(repository: UserRepository): RequestHandler {
  return (req, res, next): void => {
    req.userRepository = repository;

    return next();
  };
}
