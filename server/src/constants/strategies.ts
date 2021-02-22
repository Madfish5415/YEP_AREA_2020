import { v4 } from "uuid";

export const AUTHORIZE_SECRET = process.env.AUTHORIZE_SECRET || v4();

export const GOOGLE_AUTHORIZATION_URL =
  "https://accounts.google.com/o/oauth2/v2/auth";
export const GOOGLE_TOKEN_URL = "https://www.googleapis.com/oauth2/v4/token";
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "MISSING";
export const GOOGLE_CLIENT_SECRET =
  process.env.GOOGLE_CLIENT_SECRET || "MISSING";

export const MICROSOFT_AUTHORIZATION_URL =
  "https://login.microsoftonline.com/common/oauth2/v2.0/authorize";
export const MICROSOFT_TOKEN_URL =
  "https://login.microsoftonline.com/common/oauth2/v2.0/token";
export const MICROSOFT_CLIENT_ID = process.env.MICROSOFT_CLIENT_ID || "MISSING";
export const MICROSOFT_CLIENT_SECRET =
  process.env.MICROSOFT_CLIENT_SECRET || "MISSING";
