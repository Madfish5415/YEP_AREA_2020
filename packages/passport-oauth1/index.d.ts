// Type definitions for passport-oauth1 1.1.0
// Project: http://www.passportjs.org/packages/passport-oauth1/
// Definitions by: Guillaume Bonnet <https://github.com/MrSquaare>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.2

/// <reference types="passport"/>
/// <reference types="express" />

import { OAuth } from "oauth";
import { Request } from "express";
import { Strategy } from "passport";
import { OutgoingHttpHeaders } from "http";

declare class OAuthStrategy extends Strategy {
    name: string;

    protected _oauth: OAuth;

    constructor(options: OAuthStrategy.StrategyOptions, verify: OAuthStrategy.VerifyFunction);
    constructor(options: OAuthStrategy.StrategyOptionsWithRequest, verify: OAuthStrategy.VerifyFunctionWithRequest);

    authenticate(req: Request, options?: any): void;

    userProfile(token: string, tokenSecret: string, params: any, done: (err?: Error | null, profile?: any) => void): void;

    userAuthorizationParams(options: any): object;

    requestTokenParams(options: any): object;

    parseErrorResponse(body: any, status: number): Error | null;
}

declare class OAuthSessionStore {
    constructor(options: OAuthStrategy.SessionStoreOptions);

    get(req: Request, token: string, cb: OAuthStrategy.Callback): void;

    set(req: Request, token: string, tokenSecret: string, cb: OAuthStrategy.Callback): void;

    destroy(req: Request, token: string, cb: OAuthStrategy.Callback): void;
}

declare namespace OAuthStrategy {
    type SessionStoreOptions = {
        key: string;
    };

    type Callback = (err?: Error | null, value?: string) => void;

    interface Metadata {
        requestTokenURL: string;
        accessTokenURL: string;
        userAuthorizationURL: string;
        consumerKey: string;
    }

    interface _StrategyOptionsBase {
        requestTokenURL: string;
        accessTokenURL: string;
        userAuthorizationURL: string;
        consumerKey: string;
        consumerSecret: string;
        signatureMethod?: string;
        callbackURL?: string;
        customHeaders?: OutgoingHttpHeaders;
        sessionKey?: string;
        requestTokenStore?: SessionStore;
        skipUserProfile?: any;
        proxy?: any;
    }

    interface StrategyOptions extends _StrategyOptionsBase {
        passReqToCallback?: false;
    }

    interface StrategyOptionsWithRequest extends _StrategyOptionsBase {
        passReqToCallback: true;
    }

    type VerifyCallback = (
        err?: Error | null,
        user?: object,
        info?: object
    ) => void;

    type VerifyFunction =
        | ((
        token: string,
        tokenSecret: string,
        profile: any,
        verified: VerifyCallback
    ) => void)
        | ((
        token: string,
        tokenSecret: string,
        params: any,
        profile: any,
        verified: VerifyCallback
    ) => void);

    type VerifyFunctionWithRequest =
        | ((
        req: Request,
        token: string,
        tokenSecret: string,
        profile: any,
        verified: VerifyCallback
    ) => void)
        | ((
        req: Request,
        token: string,
        tokenSecret: string,
        params: any,
        profile: any,
        verified: VerifyCallback
    ) => void);

    type Strategy = OAuthStrategy;
    const Strategy: typeof OAuthStrategy;

    type SessionStore = OAuthSessionStore;
    const SessionStore: typeof OAuthSessionStore;
}

export = OAuthStrategy;
