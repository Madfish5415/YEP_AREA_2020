export const AUTHORIZATION_URL = "https://api.twitter.com/oauth/authenticate";
export const ACCESS_TOKEN_URL = "https://api.twitter.com/oauth/access_token";
export const REQUEST_TOKEN_URL = "https://api.twitter.com/oauth/request_token";
export const CONSUMER_KEY = process.env.TWITTER_CLIENT_ID || "MISSING";
export const CONSUMER_SECRET = process.env.TWITTER_CLIENT_SECRET || "MISSING";
