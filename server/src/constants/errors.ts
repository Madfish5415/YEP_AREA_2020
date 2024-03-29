import { StatusError } from "@area-common/types";

export const BAD_REQUEST_ERROR = new StatusError(400, {
  name: "BAD_REQUEST",
  message: "Bad request",
});

export const UNAUTHORIZED_ERROR = new StatusError(401, {
  name: "UNAUTHORIZED",
  message: "Unauthorized",
});

export const ACCOUNT_EXISTS_ERROR = new StatusError(401, {
  name: "ACCOUNT_EXISTS",
  message: "Account exists",
});

export const ACCOUNT_NOT_EXISTS_ERROR = new StatusError(401, {
  name: "ACCOUNT_NOT_EXISTS",
  message: "Account doesn't exist",
});

export const ACCOUNT_VERIFIED_ERROR = new StatusError(401, {
  name: "ACCOUNT_VERIFIED",
  message: "Account verified",
});

export const CREDENTIAL_NOT_EXISTS_ERROR = new StatusError(401, {
  name: "CREDENTIAL_NOT_EXISTS",
  message: "Credential doesn't exist",
});

export const ACCOUNT_NOT_VERIFIED_ERROR = new StatusError(401, {
  name: "ACCOUNT_NOT_VERIFIED",
  message: "Account not verified",
});

export const AUTHORIZATION_INVALID_ERROR = new StatusError(401, {
  name: "AUTHORIZATION_INVALID",
  message: "Authorization invalid",
});

export const USER_NOT_ADMIN_ERROR = new StatusError(401, {
  name: "USER_NOT_ADMIN",
  message: "User isn't an administrator",
});

export const VERIFICATION_INVALID_ERROR = new StatusError(401, {
  name: "VERIFICATION_INVALID",
  message: "Verification invalid",
});

export const SERVICE_NOT_EXISTS_ERROR = new StatusError(404, {
  name: "SERVICE_NOT_EXISTS",
  message: "Service doesn't exist",
});

export const SERVICE_NODE_NOT_EXISTS = new StatusError(404, {
  name: "SERVICE_NODE_NOT_EXISTS",
  message: "Service node doesn't exist",
});

export const USER_NOT_EXISTS_ERROR = new StatusError(404, {
  name: "USER_NOT_EXISTS",
  message: "User doesn't exist",
});

export const WORKFLOW_NOT_EXISTS = new StatusError(404, {
  name: "WORKFLOW_NOT_EXISTS",
  message: "Workflow doesn't exist",
});

export const WORKFLOW_CIRCULAR_DEPENDENCY_ERROR = new StatusError(400, {
  name: "WORKFLOW_CIRCULAR_DEPENDENCY",
  message: "Workflow has a circular dependency",
});
