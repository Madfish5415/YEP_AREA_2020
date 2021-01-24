import { User } from "@area-common/types";
import { Repository } from "../types";

export class UserRepository extends Repository {
  async get(id: string): Promise<User> {
    const response = await fetch(`${this.remoteURL}/users/${id}`);
    const json = await response.json()

    return json["data"];
  }
}
