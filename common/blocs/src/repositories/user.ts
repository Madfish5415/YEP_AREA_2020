import { StatusError, User } from "@area-common/types";

import { Repository } from "../types";

export class UserRepository extends Repository {
  async read(authorization: string): Promise<User> {
    const response = await fetch(`${this.remoteURL}/user`, {
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

  async update(authorization: string, partial: Partial<User>): Promise<User> {
    const jsonPartial = JSON.stringify(partial);
    const response = await fetch(`${this.remoteURL}/user`, {
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

  async delete(authorization: string): Promise<void> {
    const response = await fetch(`${this.remoteURL}/user`, {
      method: "DELETE",
      headers: {
        Authorization: authorization,
      },
    });
    const json = await response.json();

    if (json.status !== 200) {
      throw new StatusError(json.status, json.failure);
    }
  }
}
