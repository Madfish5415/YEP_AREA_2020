import { APIResponse, User } from "@area-common/types";
import { Router } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";

import { AUTHENTICATION_VERIFY_ROUTE, AUTHORIZE_SECRET } from "../../constants";

export const authenticationVerify = Router();

authenticationVerify.post(
  AUTHENTICATION_VERIFY_ROUTE,
  passport.authenticate("signup", { session: false }),
  (req, res) => {
    const user = req.user as User;
    const token = jwt.sign(user.id, AUTHORIZE_SECRET);

    const response: APIResponse = {
      status: 200,
      data: { token },
    };

    return res.json(response);
  }
);
