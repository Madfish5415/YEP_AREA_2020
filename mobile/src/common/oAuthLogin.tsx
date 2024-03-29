import { AuthConfiguration, authorize } from "react-native-app-auth";
import { getLocalStorage, setLocalStorage } from "./localStorage";

export const oAuthLogin = async (
  oAuthConfig: AuthConfiguration,
  serviceName: string
): Promise<void> => {
  const data = await getLocalStorage("@userToken");
  if (data) {
    try {
      const result = await authorize(oAuthConfig);
      await fetch(
        `${serverURL}/api/authentication/services/${serviceName}/provide`,
        {
          headers: {
            authorization: data,
            "content-type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            accessToken: result["accessToken"],
            refreshToken: result["refreshToken"],
          }),
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
};

export const oAuthSignIn = async (
  oAuthConfig: AuthConfiguration,
  serviceName: string
): Promise<void> => {
  const result = await authorize(oAuthConfig);
  if (result) {
    const response = await fetch(
      `${serverURL}/api/authentication/parties/${serviceName}/callback?accessToken=${result["accessToken"]}&refreshToken=${result["refreshToken"]}`
    );
    const json = await response.json();
    await setLocalStorage("@userToken", json["data"]["token"]);
  }
};
