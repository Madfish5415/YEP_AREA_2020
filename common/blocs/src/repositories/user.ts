import { User } from "@area-common/types";
import { Repository } from "../types";

export class UserRepository extends Repository {
  async read(id: string): Promise<User> {
    const response = await fetch(`${this.remoteURL}/users/${id}`);
    const json = await response.json();

    if (json.status !== 200) {
      throw Error(json.error.code);
    }
    return json["data"];
  }
}
