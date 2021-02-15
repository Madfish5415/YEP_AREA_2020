import {
  OAuth2,
  OAuth2Options,
  OAuth2Verify,
  OAuth2VerifyCallback,
} from "@dashboard/oauth";
import {
  ServiceRequest,
  ServiceResponse,
  ServiceSetting,
  User,
} from "@dashboard/types";
import { BaseAction } from "../action";
import { BaseService } from "./service";

export abstract class ServiceOAuth2 extends BaseService implements OAuth2 {
  abstract readonly id: string;
  abstract readonly name: string;
  abstract readonly description: string;
  abstract readonly version: string;
  abstract readonly actions: BaseAction[];
  abstract readonly options: OAuth2Options;

  async state(request: ServiceRequest): Promise<ServiceResponse> {
      const token = await this.repository?.read(
          request.user.username,
          "accessToken"
      );

      return {
          code: 200,
          data: token !== undefined,
      };
  }

  verify(user: User): OAuth2Verify {
      return async (
          accessToken: string,
          refreshToken: string,
          done: OAuth2VerifyCallback
      ) => {
          const accessTokenSetting: ServiceSetting = {
              username: user.username,
              key: "accessToken",
              value: accessToken,
              secure: true,
          };
          const refreshTokenSetting: ServiceSetting = {
              username: user.username,
              key: "refreshToken",
              value: refreshToken,
              secure: true,
          };

          try {
              await this.repository?.update(
                  accessTokenSetting.username,
                  accessTokenSetting.key,
                  accessTokenSetting,
                  true
              );
              await this.repository?.update(
                  refreshTokenSetting.username,
                  refreshTokenSetting.key,
                  refreshTokenSetting,
                  true
              );
          } catch (e) {
              return done(e);
          }

          done(undefined, user);
      };
  }

  toJSON(): Partial<Service> {
      const { repository, options, ...rest } = this;

      return rest;
  }
}
