import { User } from "@area-common/types";

import { UserModel } from "../database";

export class UserRepository {
  model = UserModel;

  async create(user: User): Promise<void> {
    await this.model.create(user);
  }

  async read(id: string): Promise<User | null> {
    return this.model.findOne({ id });
  }

  async update(id: string, partial: Partial<User>): Promise<User | null> {
    return this.model.findOneAndUpdate({ id }, partial, { new: true });
  }

  async delete(id: string): Promise<void> {
    await this.model.deleteOne({ id });
  }

  async exists(id: string): Promise<boolean> {
    return this.model.exists({ id });
  }

  async list(): Promise<User[]> {
    return this.model.find();
  }

  async deleteAll(): Promise<void> {
    await this.model.deleteMany();
  }
}
