import { OAuth } from "oauth";

import { OAuthClient } from "../utilities/headers";
import {
  ACCESS_TOKEN_URL,
  CONSUMER_KEY,
  CONSUMER_SECRET,
  REQUEST_TOKEN_URL,
} from "./strategy";

export const CLIENT = new OAuth(
  REQUEST_TOKEN_URL,
  ACCESS_TOKEN_URL,
  CONSUMER_KEY,
  CONSUMER_SECRET,
  "1.0",
  null,
  "HMAC-SHA1"
);

export const NATIVE_CLIENT = new OAuthClient(
  CONSUMER_KEY,
  CONSUMER_SECRET,
  "HMAC-SHA1"
);
