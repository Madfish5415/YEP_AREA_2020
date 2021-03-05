import { APIResponse, StatusError } from "@area-common/types";
import { ErrorRequestHandler } from "express";

export function errorMiddleware(): ErrorRequestHandler {
  return (err, req, res, next) => {
    console.error(err);

    if (err instanceof StatusError) {
      const response: APIResponse = {
        status: err.code,
        failure: {
          name: err.name,
          message: err.message,
        },
      };

      return res.status(response.status).json(response);
    }

    const response: APIResponse = {
      status: 500,
      failure: {
        name: "INTERNAL_SERVER_ERROR",
        message: "An internal server error has occurred.",
      },
    };

    return res.status(response.status).json(response);
  };
}
