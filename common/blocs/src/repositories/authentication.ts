import { SignIn, SignUp, StatusError } from "@area-common/types";

import { Repository } from "../types";

export class AuthenticationRepository extends Repository {
  async signin(signin: SignIn): Promise<string> {
    const jsonData = JSON.stringify(signin);
    const response = await fetch(`${this.remoteURL}/authentication/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    });
    const json = await response.json();

    if (json.status !== 200) {
      throw new StatusError(json.error.code, json.error);
    }
    return json["data"]["token"];
  }

  async signup(signup: SignUp): Promise<string> {
    const jsonData = JSON.stringify(signup);
    const response = await fetch(`${this.remoteURL}/authentication/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    });
    const json = await response.json();

    if (json.status !== 200) {
      throw new StatusError(json.error.code, json.error);
    }

    return json["data"]["token"];
  }
}
