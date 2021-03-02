import jwt from "jsonwebtoken";
import { Strategy } from "passport-custom";

import {
  AUTHORIZE_SECRET,
  BAD_REQUEST_ERROR,
  USER_NOT_EXISTS_ERROR,
} from "../constants";
import { UserRepository } from "../repositories";

export class AuthorizeStrategy extends Strategy {
  constructor(userRepository: UserRepository) {
    super(async (req, done) => {
      const authorization = req.header("Authorization");

      if (!authorization) {
        return done(BAD_REQUEST_ERROR);
      }

      const id = jwt.verify(authorization, AUTHORIZE_SECRET) as string;
      const user = await userRepository.read(id);

      if (!user) {
        return done(USER_NOT_EXISTS_ERROR);
      }

      return done(null, user);
    });
  }
}
