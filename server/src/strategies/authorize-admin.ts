import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { Strategy } from "passport-custom";

import {
  AUTHORIZATION_INVALID_ERROR,
  AUTHORIZE_SECRET,
  BAD_REQUEST_ERROR,
  USER_NOT_ADMIN_ERROR,
  USER_NOT_EXISTS_ERROR,
} from "../constants";
import { UserRepository } from "../repositories";

export class AuthorizeAdminStrategy extends Strategy {
  constructor(userRepository: UserRepository) {
    super(async (req, done) => {
      try {
        const authorization = req.header("Authorization");

        if (!authorization) {
          return done(BAD_REQUEST_ERROR);
        }

        const id = jwt.verify(authorization, AUTHORIZE_SECRET) as string;
        const user = await userRepository.read(id);

        if (!user) {
          return done(USER_NOT_EXISTS_ERROR);
        }

        if (!user.administrator) {
          return done(USER_NOT_ADMIN_ERROR);
        }

        return done(null, user);
      } catch (e) {
        if (e instanceof JsonWebTokenError) {
          return done(AUTHORIZATION_INVALID_ERROR);
        }

        return done(e);
      }
    });
  }
}
