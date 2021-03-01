import { User } from "@area-common/types";
import { Repository } from "../types";
import users from "../data/users";

export class UserRepository extends Repository {
  async get(id: string): Promise<User> {
    const userJson = users.find((user) => user.id === id);

    if (userJson === undefined) {
      throw Error("User not found");
    }

    return userJson;
    const response = await fetch(`${this.remoteURL}/users/${id}`);
    const json = await response.json();

    if (json.status !== 200) {
      throw Error(json.error.code);
    }
    return json["data"];
  }

  async getCredentials(id: string): Promise<Credential> {
    const response = await fetch(`${this.remoteURL}/api/credentials/${id}`);
    const json = await response.json();

    if (json.status != 200) {
      throw Error(json.error.code);
    }
    return json["data"];
  }
}
