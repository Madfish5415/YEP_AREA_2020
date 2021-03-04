import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusError } from "@area-common/types";
import {
  serviceUnavailableStatus,
  unknownErrorStatus,
} from "../../constants/status";

async function apiSignIn(
  email: string,
  password: string,
  setLoading: (loading: boolean) => void,
  setSignedIn: (signedIn: boolean) => void,
  setError: (error: StatusError | undefined) => void
) {
  setLoading(true);
  setSignedIn(false);
  setError(undefined);

  try {
    const response = await fetch(
      `http://localhost:8080/api/authentication/signin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );

    const result = await (async () => {
      try {
        return await response.json();
      } catch (e) {
        return "Unknown error";
      }
    })();

    setLoading(false);

    if (response.status !== 200) {
      return setError({
        code: result.status,
        name: result.failure.name,
        message: result.failure.message,
      });
    }

    try {
      console.log(result.data.token);
      await AsyncStorage.setItem("@userToken", result.data.token);
    } catch (_) {
      return setError(unknownErrorStatus);
    }
    return setSignedIn(true);
  } catch (err) {
    setLoading(false);

    console.error(err);

    return setError(serviceUnavailableStatus);
  }
}

export function useSignIn() {
  const [loading, setLoading] = useState(false);
  const [signedIn, setSignedUp] = useState(false);
  const [error, setError] = useState<StatusError>();

  const signIn = async (email: string, password: string) => {
    await apiSignIn(email, password, setLoading, setSignedUp, setError);
  };

  return { loading, signedIn, error, signIn };
}
