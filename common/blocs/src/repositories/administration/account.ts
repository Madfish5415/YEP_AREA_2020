import { Account, StatusError } from "@area-common/types";

import { Repository } from "../../types";

export class AdminAccountRepository extends Repository {
  async read(authorization: string, id: string): Promise<Account> {
    const response = await fetch(
      `${this.remoteURL}/administration/users/${id}/account`,
      {
        method: "GET",
        headers: {
          Authorization: authorization,
        },
      }
    );
    const json = await response.json();

    if (json.status !== 200) {
      throw new StatusError(json.status, json.failure);
    }
    return json["data"];
  }

  async update(
    authorization: string,
    id: string,
    partial: Partial<Account>
  ): Promise<Account> {
    const jsonPartial = JSON.stringify(partial);
    const response = await fetch(
      `${this.remoteURL}/administration/users/${id}/account`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorization,
        },
        body: jsonPartial,
      }
    );
    const json = await response.json();

    if (json.status !== 200) {
      throw new StatusError(json.status, json.failure);
    }
    return json["data"];
  }
}
