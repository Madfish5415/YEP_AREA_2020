import Crypto from "crypto";
import crypto from "crypto-js";

export class OAuthClient {
  consumerKey: string;
  consumerSecret: string;
  signatureMethod: string;

  constructor(
    consumerKey: string,
    consumerSecret: string,
    signatureMethod: string
  ) {
    this.consumerKey = consumerKey;
    this.consumerSecret = consumerSecret;
    this.signatureMethod = signatureMethod;
  }

  generateAuthorization(
    token: string,
    tokenSecret: string,
    uri: string,
    init: RequestInit
  ): string {
    const oauthParameters = {
      oauth_consumer_key: this.consumerKey,
      oauth_nonce: this.generateNonce(),
      oauth_signature_method: this.signatureMethod,
      oauth_timestamp: this.generateTimestamp(),
      oauth_token: token,
      oauth_version: "1.0",
    };

    const rawBody = init.body ?? "{}";
    const body = JSON.parse(rawBody as string);

    const method = init.method ?? "GET";

    const url = new URL(uri);
    const urlRoot = `${url.origin}${url.pathname}`;

    const oauthParametersEntries = Object.entries(oauthParameters);
    const bodyEntries = Object.entries(body);
    const parametersEntries = [
      ...oauthParametersEntries,
      ...url.searchParams,
      ...bodyEntries,
    ];

    const message = this.generateMessage(method, urlRoot, parametersEntries);

    const key = this.generateKey(tokenSecret);

    const signature = this.generateSignature(message, key);
    const encodedSignature = encodeURIComponent(signature);

    oauthParametersEntries.push(["oauth_signature", encodedSignature]);

    const header = this.generateHeader(oauthParametersEntries);

    return header;
  }

  private generateHeader(oauthParameters: [string, string][]) {
    const chainedOAuthParameters = oauthParameters
      .map((parameter) => {
        return `${parameter[0]}="${parameter[1]}"`;
      })
      .join(", ");

    return `OAuth ${chainedOAuthParameters}`;
  }

  private generateKey(tokenSecret: string) {
    const encodedConsumerSecret = encodeURIComponent(this.consumerSecret);
    const encodedTokenSecret = encodeURIComponent(tokenSecret);

    return `${encodedConsumerSecret}&${encodedTokenSecret}`;
  }

  private generateMessage(
    method: string,
    url: string,
    parameters: [string, unknown][]
  ): string {
    const chainedParameters = parameters
      .map((parameter) => {
        return `${parameter[0]}=${parameter[1]}`;
      })
      .join("&");

    const encodedURL = encodeURIComponent(url);
    const encodedChainedParameters = encodeURIComponent(chainedParameters);

    return `${method}&${encodedURL}&${encodedChainedParameters}`;
  }

  private generateNonce(): string {
    const random = Crypto.randomBytes(32);

    return random.toString("hex");
  }

  private generateSignature(message: string, key: string): string {
    const signature = crypto.HmacSHA1(message, key);

    return signature.toString(crypto.enc.Base64);
  }

  private generateTimestamp(): string {
    const seconds = Math.ceil(Date.now() / 1000);

    return seconds.toString();
  }
}
