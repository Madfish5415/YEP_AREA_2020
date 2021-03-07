export type OAuth2Options = {
  authorizationURL: string;
  tokenURL: string;
  clientID: string;
  clientSecret: string;
  scope?: string | string[];
  scopeSeparator?: string;
};