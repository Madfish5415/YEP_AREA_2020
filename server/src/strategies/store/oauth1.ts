import { Request } from "express";
import { Callback, SessionStore } from "passport-oauth1";

export class OAuth1StrategyStore implements SessionStore {
  private token?: string;
  private tokenSecret?: string;

  destroy(req: Request, token: string, cb: Callback): void {
    this.token = undefined;
    this.tokenSecret = undefined;

    cb();
  }

  get(req: Request, token: string, cb: Callback): void {
    cb(null, this.tokenSecret);
  }

  set(req: Request, token: string, tokenSecret: string, cb: Callback): void {
    this.token = token;
    this.tokenSecret = tokenSecret;

    cb();
  }
}
