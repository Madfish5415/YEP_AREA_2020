import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function apiSignUp(
  username: string,
  password: string,
  confirmPassword: string,
  email: string,
  firstName: string,
  lastName: string,
  setLoading: (loading: boolean) => void,
  setSignedUp: (signedUp: boolean) => void,
  setError: (error: string | undefined) => void
) {
  setLoading(true);
  setSignedUp(false);
  setError(undefined);

  try {
    const response = await fetch(
      `http://localhost:8080/api/authentication/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          confirmPassword: confirmPassword,
          email: email,
          firstName: firstName,
          lastName: lastName,
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
      return setError(result);
    }

    try {
      await AsyncStorage.setItem("@userToken", result.data.token);
    } catch (_) {
      return "Unable to store user token";
    }
    return setSignedUp(true);
  } catch (err) {
    setLoading(false);

    console.error(err);

    return setError("Service unavailable");
  }
}

export function useSignUp() {
  const [loading, setLoading] = useState(false);
  const [signedUp, setSignedUp] = useState(false);
  const [error, setError] = useState<string>();

  const signUp = async (
    username: string,
    password: string,
    confirmPassword: string,
    email: string,
    firstName: string,
    lastName: string
  ) => {
    await apiSignUp(
      username,
      password,
      confirmPassword,
      email,
      firstName,
      lastName,
      setLoading,
      setSignedUp,
      setError
    );
  };

  return { loading, signedUp, error, signUp };
}
