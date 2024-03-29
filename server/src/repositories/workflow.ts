import { Workflow } from "@area-common/types";

import { WorkflowModel } from "../database";

export class WorkflowRepository {
  model = WorkflowModel;

  async create(workflow: Workflow): Promise<void> {
    await this.model.create(workflow);
  }

  async read(id: string): Promise<Workflow | null> {
    return this.model.findOne({ id });
  }

  async update(
    id: string,
    partial: Partial<Workflow>
  ): Promise<Workflow | null> {
    return this.model.findOneAndUpdate({ id }, partial, { new: true });
  }

  async delete(id: string): Promise<void> {
    await this.model.deleteOne({ id });
  }

  async exists(id: string): Promise<boolean> {
    return this.model.exists({ id });
  }

  async list(userId?: string): Promise<Workflow[]> {
    if (!userId) {
      return this.model.find();
    }

    return this.model.find({ userId });
  }

  async deleteAll(userId?: string): Promise<void> {
    if (userId) {
      await this.model.deleteMany({ userId });
    } else {
      await this.model.deleteMany();
    }
  }
}
