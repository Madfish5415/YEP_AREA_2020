import { Credential } from "@area-common/types";

import { CredentialModel } from "../database";

type UserId = {
  userId: string;
};

type ServiceId = {
  serviceId: string;
};

type Filter = UserId & ServiceId;

export class CredentialRepository {
  model = CredentialModel;

  async create(credential: Credential): Promise<void> {
    await this.model.create(credential);
  }

  async read(filter: Filter): Promise<Credential | null> {
    return this.model.findOne(filter);
  }

  async update(
    filter: Filter,
    partial: Partial<Credential>
  ): Promise<Credential | null> {
    return this.model.findOneAndUpdate(filter, partial);
  }

  async delete(filter: Filter): Promise<void> {
    await this.model.deleteMany(filter);
  }

  async exists(filter: Filter): Promise<boolean> {
    return this.model.exists(filter);
  }

  async list(userId?: string): Promise<Credential[]> {
    return this.model.find({ userId });
  }
}
