import { google } from "googleapis";

import { CLIENT_ID, CLIENT_SECRET } from "./strategy";

export const OAUTH2_CLIENT = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);
export const GMAIL_CLIENT = google.gmail({
  version: "v1",
  auth: OAUTH2_CLIENT,
});
