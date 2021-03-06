export type OAuthVerify = (
  token: string,
  tokenSecret: string,
  verify: OAuthVerifyCallback
) => void;

export type OAuthVerifyCallback = (err?: Error, user?: any) => void;