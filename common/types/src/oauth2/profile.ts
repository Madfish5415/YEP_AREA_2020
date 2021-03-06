export type OAuth2Profile = (
  accessToken: string,
  refreshToken: string,
  params: any,
  verify: OAuth2ProfileCallback
) => void;

export type OAuth2ProfileCallback = (err?: Error, profile?: any) => void;
