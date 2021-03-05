import { AuthConfiguration, authorize } from "react-native-app-auth";
import { getLocalStorage, setLocalStorage } from "./localStorage";

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
  oAuthConfig: AuthConfiguration,
  serviceName: string
): Promise<void> => {
  const result = await authorize(oAuthConfig);
  if (result) {
    console.log(result);
    const response = await fetch(
      `http://localhost:8080/api/authentication/parties/${serviceName}/callback?accessToken=${result["accessToken"]}&refreshToken=${result["refreshToken"]}`
    );
    const json = await response.json();
    await setLocalStorage("@userToken", json["data"]["token"]);
    console.log(json["data"]["token"]);
  }
};
