import { AuthConfiguration, authorize } from "react-native-app-auth";
import { getLocalStorage } from "./localStorage";

export const oAuthLogin = async (
  oAuthConfig: AuthConfiguration
): Promise<void> => {
  const data = await getLocalStorage("@userToken");
  if (data) {
    console.log("data", data);
    try {
      const result = await authorize(oAuthConfig);
      console.log(result);
      await fetch(
        `http://localhost:8080/api/authentication/services/google/callback?accessToken=${result["accessToken"]}&refreshToken=${result["refreshToken"]}`,
        {
          headers: {
            authorization: data,
          },
        }
      );
      return new Promise((resolve) => {
        resolve();
      });
    } catch (error) {
      console.log(error);
      return new Promise((reject) => {
        reject();
      });
    }
  }
  return new Promise((reject) => {
    reject();
  });
};

export const oAuthSignIn = async (
  oAuthConfig: AuthConfiguration
): Promise<void> => {
  const result = await authorize(oAuthConfig);
  console.log(result);
  // TODO: Add URL to log-in a user and keep it in the local storage
  /*await fetch(
        `http://localhost:8080/api/authentication/services/google/callback?accessToken=${result["accessToken"]}&refreshToken=${result["refreshToken"]}`,
        {
          headers: {
            authorization: data,
          },
        }
      );*/
};
