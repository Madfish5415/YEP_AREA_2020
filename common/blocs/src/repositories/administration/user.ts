import { StatusError, User } from "@area-common/types";

import { Repository } from "../../types";

export class AdminUserRepository extends Repository {
  async read(authorization: string, id: string): Promise<User> {
    const response = await fetch(
      `${this.remoteURL}/administration/users/${id}`,
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
    partial: Partial<User>
  ): Promise<User> {
    const jsonPartial = JSON.stringify(partial);
    const response = await fetch(
      `${this.remoteURL}/administration/users/${id}`,
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

  async delete(authorization: string, id: string): Promise<void> {
    const response = await fetch(
      `${this.remoteURL}/administration/users/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: authorization,
        },
      }
    );
    const json = await response.json();

    if (json.status !== 200) {
      throw new StatusError(json.status, json.failure);
    }
    return;
  }

  async list(authorization: string): Promise<User[]> {
    const response = await fetch(`${this.remoteURL}/administration/users`, {
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
}
