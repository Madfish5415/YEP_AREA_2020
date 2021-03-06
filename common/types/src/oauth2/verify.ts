export type OAuth2Verify = (
  accessToken: string,
  refreshToken: string,
  verify: OAuth2VerifyCallback
) => void;

export type OAuth2VerifyCallback = (err?: Error, user?: any) => void;