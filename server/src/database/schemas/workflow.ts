import { Workflow, WorkflowNode } from "@area-common/types";
import { Document, model, Schema } from "mongoose";

export type WorkflowNodeDocument = Document & WorkflowNode;

export type WorkflowDocument = Document & Workflow;

const WorkflowNodeSchema = new Schema<WorkflowNodeDocument>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  serviceId: { type: String, required: true },
  nodeId: { type: String, required: true },
  parameters: { type: Object, required: true },
  condition: { type: String, required: true },
  nextNodes: { type: Array, required: true },
});

export const WorkflowSchema = new Schema<WorkflowDocument>({
  userId: { type: String, required: true },
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  active: { type: Boolean, required: true },
  nodes: { type: [WorkflowNodeSchema], required: true },
  starters: { type: Array, required: true },
});

WorkflowSchema.index({ userId: 1, id: 1 }, { unique: true });

export const WorkflowModel = model("Workflow", WorkflowSchema);
