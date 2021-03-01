import { OAuth } from "oauth";
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
  "1.0A",
  null,
  "HMAC-SHA1"
);
