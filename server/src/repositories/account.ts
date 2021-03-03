import { Account } from "@area-common/types";

import { AccountModel } from "../database";

type UserId = {
  userId: string;
};

type Id = {
  id: string;
};

type Email = {
  email: string;
};

type Filter = UserId | Id | Email;

export class AccountRepository {
  model = AccountModel;

  async create(account: Account): Promise<void> {
    await this.model.create(account);
  }

  async read(filter: Filter): Promise<Account | null> {
    return this.model.findOne(filter);
  }

  async update(
    filter: Filter,
    partial: Partial<Account>
  ): Promise<Account | null> {
    return this.model.findOneAndUpdate(filter, partial, { new: true });
  }

  async delete(filter: Filter): Promise<void> {
    await this.model.deleteOne(filter);
  }

  async exists(filter: Filter): Promise<boolean> {
    return this.model.exists(filter);
  }

  async list(): Promise<Account[]> {
    return this.model.find();
  }

  async deleteAll(): Promise<boolean> {
    return this.model.deleteMany();
  }

  async comparePassword(filter: Filter, password: string): Promise<boolean> {
    const account = await this.model.findOne(filter).select("+password");

    return account?.comparePassword(password) ?? false;
  }

  async compareVerification(
    filter: Filter,
    verification: string
  ): Promise<boolean> {
    const account = await this.model.findOne(filter).select("+verification");

    return account?.compareVerification(verification) ?? false;
  }
}
