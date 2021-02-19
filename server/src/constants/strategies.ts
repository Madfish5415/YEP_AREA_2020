import { v4 } from "uuid";

export const AUTHORIZE_SECRET = process.env.AUTHORIZE_SECRET || v4();

export const GOOGLE_AUTHORIZATION_URL = "";
export const GOOGLE_TOKEN_URL = "";
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "MISSING";
export const GOOGLE_CLIENT_SECRET =
  process.env.GOOGLE_CLIENT_SECRET || "MISSING";

export const MICROSOFT_AUTHORIZATION_URL = "";
export const MICROSOFT_TOKEN_URL = "";
export const MICROSOFT_CLIENT_ID = process.env.MICROSOFT_CLIENT_ID || "MISSING";
export const MICROSOFT_CLIENT_SECRET =
  process.env.MICROSOFT_CLIENT_SECRET || "MISSING";
