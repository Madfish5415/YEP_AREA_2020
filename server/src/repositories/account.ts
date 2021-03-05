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

export type AccountFilter = UserId | Id | Email;

export class AccountRepository {
  model = AccountModel;

  async create(account: Account): Promise<void> {
    await this.model.create(account);
  }

  async read(filter: AccountFilter): Promise<Account | null> {
    return this.model.findOne(filter);
  }

  async update(
    filter: AccountFilter,
    partial: Partial<Account>
  ): Promise<Account | null> {
    return this.model.findOneAndUpdate(filter, partial, { new: true });
  }

  async delete(filter: AccountFilter): Promise<void> {
    await this.model.deleteOne(filter);
  }

  async exists(filter: AccountFilter): Promise<boolean> {
    return this.model.exists(filter);
  }

  async list(): Promise<Account[]> {
    return this.model.find();
  }

  async deleteAll(): Promise<void> {
    await this.model.deleteMany();
  }

  async comparePassword(
    filter: AccountFilter,
    password: string
  ): Promise<boolean> {
    const account = await this.model.findOne(filter).select("+password");

    return account?.comparePassword(password) ?? false;
  }

  async compareVerification(
    filter: AccountFilter,
    verification: string
  ): Promise<boolean> {
    const account = await this.model.findOne(filter).select("+verification");

    return account?.compareVerification(verification) ?? false;
  }
}
