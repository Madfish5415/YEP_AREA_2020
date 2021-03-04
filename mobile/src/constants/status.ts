import { StatusError } from "@area-common/types";

export const badRequestStatus = new StatusError(400, {
  name: "BAD_REQUEST",
  message: "Bad request",
});

export const unauthorizedStatus = new StatusError(401, {
  name: "UNAUTHORIZED",
  message: "Unauthorized",
});

export const serviceUnavailableStatus = new StatusError(503, {
  name: "SERVICE_UNAVAILABLE",
  message: "Service unavailable",
});

export const unknownErrorStatus = new StatusError(520, {
  name: "UNKNOWN_ERROR",
  message: "Unknown error",
});
