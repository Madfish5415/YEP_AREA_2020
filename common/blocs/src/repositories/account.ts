import { Account, StatusError } from "@area-common/types";

import { Repository } from "../types";

export class AccountRepository extends Repository {
  async read(authorization: string): Promise<Account> {
    const response = await fetch(`${this.remoteURL}/api/user/account`, {
      method: "GET",
      headers: {
        Authorization: authorization,
      },
    });
    const json = await response.json();

    if (json.status !== 200) {
      throw new StatusError(json.status, json.failure);
    }
    return json["data"];
  }

  async update(
    authorization: string,
    partial: Partial<Account>
  ): Promise<Account> {
    const jsonPartial = JSON.stringify(partial);
    const response = await fetch(`${this.remoteURL}/api/user/account`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
      body: jsonPartial,
    });
    const json = await response.json();

    if (json.status !== 200) {
      throw new StatusError(json.status, json.failure);
    }
    return json["data"];
  }
}
