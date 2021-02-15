export type OAuthProfile = (
  token: string,
  tokenSecret: string,
  params: any,
  verify: OAuthProfileCallback
) => void;

export type OAuthProfileCallback = (err?: Error, profile?: any) => void;