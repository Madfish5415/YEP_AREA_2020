import { Credential } from "@area-common/types";

import { CredentialModel } from "../database";

type UserId = {
  userId: string;
};

type ServiceId = {
  serviceId: string;
};

export type CredentialFilter = UserId & ServiceId;

export class CredentialRepository {
  model = CredentialModel;

  async create(credential: Credential): Promise<void> {
    await this.model.create(credential);
  }

  async read(filter: CredentialFilter): Promise<Credential | null> {
    return this.model.findOne(filter);
  }

  async update(
    filter: CredentialFilter,
    partial: Partial<Credential>
  ): Promise<Credential | null> {
    return this.model.findOneAndUpdate(filter, partial, { new: true });
  }

  async delete(filter: CredentialFilter): Promise<void> {
    await this.model.deleteMany(filter);
  }

  async exists(filter: CredentialFilter): Promise<boolean> {
    return this.model.exists(filter);
  }

  async list(userId?: string): Promise<Credential[]> {
    if (userId) {
      return this.model.find({ userId });
    }

    return this.model.find();
  }

  async deleteAll(userId?: string): Promise<void> {
    if (userId) {
      await this.model.deleteMany({ userId });
    } else {
      await this.model.deleteMany();
    }
  }
}
