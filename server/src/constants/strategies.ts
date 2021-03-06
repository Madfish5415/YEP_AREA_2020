export const GITHUB_AUTHORIZATION_URL =
  "https://github.com/login/oauth/authorize";
export const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";
export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || "MISSING";
export const GITHUB_CLIENT_SECRET =
  process.env.GITHUB_CLIENT_SECRET || "MISSING";

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

export const TWITTER_AUTHORIZATION_URL =
  "https://api.twitter.com/oauth/authenticate";
export const TWITTER_ACCESS_TOKEN_URL =
  "https://api.twitter.com/oauth/access_token";
export const TWITTER_REQUEST_TOKEN_URL =
  "https://api.twitter.com/oauth/request_token";
export const TWITTER_CONSUMER_KEY =
  process.env.TWITTER_CONSUMER_KEY || "MISSING";
export const TWITTER_CONSUMER_SECRET =
  process.env.TWITTER_CONSUMER_SECRET || "MISSING";
