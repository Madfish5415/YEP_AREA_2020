import { APIResponse, User } from "@area-common/types";
import passport from "passport";

import { AUTHENTICATION_SERVICE_ROUTE } from "../../../../constants";
import { authenticationServiceRouter } from "./index";

authenticationServiceRouter.post(
  AUTHENTICATION_SERVICE_ROUTE,
  passport.authenticate("authorize", { session: false, failWithError: true }),
  async (req, res, next) => {
    try {
      const user = req.user as User;

      const filter = {
        userId: user.id,
        serviceId: req.serviceId,
      };
      const value = req.body;

      const exists = await req.credentialRepository.exists(filter);

      if (!exists) {
        await req.credentialRepository.create({
          ...filter,
          value: JSON.stringify(value),
        });
      } else {
        await req.credentialRepository.update(filter, {
          value: JSON.stringify(value),
        });
      }

      const response: APIResponse = {
        status: 200,
        success: {
          name: "AUTHENTICATION_SERVICE_SUCCESS",
          message: "Successfully authenticated to the service",
        },
      };

      return res.json(response);
    } catch (e) {
      return next(e);
    }
  }
);
