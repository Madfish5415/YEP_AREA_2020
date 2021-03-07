export const AUTHORIZATION_URL =
  "https://login.microsoftonline.com/common/oauth2/v2.0/authorize";
export const TOKEN_URL =
  "https://login.microsoftonline.com/common/oauth2/v2.0/token";
export const CLIENT_ID = process.env.MICROSOFT_CLIENT_ID || "MISSING";
export const CLIENT_SECRET = process.env.MICROSOFT_CLIENT_SECRET || "MISSING";
