import { StatusError } from "@area-common/types";

import { Repository } from "../types";

export class CredentialRepository extends Repository {
  async list(authorization: string): Promise<string[]> {
    const response = await fetch(`${this.remoteURL}/user/credentials`, {
      method: "GET",
      headers: {
        Authorization: authorization,
      },
    });
    const json = await response.json();

    if (json.status !== 200) {
      throw new StatusError(json.error.code, json.error);
    }

    return json["data"];
  }
}
