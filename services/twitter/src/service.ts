import { OAuth1Service } from "@area-common/service";
import { TweetReaction } from "./reactions";
import { StrategyOptions } from "passport-oauth1";
import {
  ACCESS_TOKEN_URL,
  AUTHORIZATION_URL,
  CONSUMER_KEY,
  CONSUMER_SECRET,
  REQUEST_TOKEN_URL,
} from "./constants";
import { TweetSource } from "./sources";
import { TweetAction } from "./action";

export class TwitterService extends OAuth1Service {
  readonly id: string = "twitter";
  readonly name: string = "Twitter";
  readonly version: string = "1.0.0";
  readonly description: string = "Twitter service for AREA";
  readonly actions = [new TweetAction()];
  readonly reactions = [new TweetReaction()];
  readonly sources = [new TweetSource()];
  readonly options: StrategyOptions = {
    userAuthorizationURL: AUTHORIZATION_URL,
    accessTokenURL: ACCESS_TOKEN_URL,
    requestTokenURL: REQUEST_TOKEN_URL,
    consumerKey: CONSUMER_KEY,
    consumerSecret: CONSUMER_SECRET,
  };
}
