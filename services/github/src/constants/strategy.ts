export const AUTHORIZATION_URL = "https://github.com/login/oauth/authorize";
export const TOKEN_URL = "https://github.com/login/oauth/access_token";
export const CLIENT_ID = process.env.GITHUB_CLIENT_ID || "MISSING";
export const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || "MISSING";
