import { User } from "@area-common/types";
import { Repository } from "../types";
import users from "../data/users";

function toJSON(user: User) {
  return {
    ...user,
  };
}
export class UserRepository extends Repository {
  async create(user: User): Promise<void> {
    const newUser = {
      id: user.id,
      username: user.id,
      firstName: user.firstName!,
      lastName: user.lastName!,
      administrator: user.administrator,
    };

    users.push(newUser);
  }

  async read(id: string): Promise<User> {
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

  async update(id: string, user: User): Promise<void> {
    const index = users.findIndex((user) => user.id === id);
    const userJson = {
      id: user.id,
      username: user.username,
      firstName: user.firstName!,
      lastName: user.lastName!,
      administrator: user.administrator,
    };

    if (index !== -1) {
      users[index] = userJson;
    } else {
      throw Error("User not found");
    }
  }

  async delete(id: string): Promise<void> {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
      users.splice(index, 1);
    } else {
      throw Error("User not found");
    }
  }

  async list(): Promise<User[]> {
    return Promise.all(
      users.map((user) => {
        return user;
      })
    );
  }
}
