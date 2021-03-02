import {
  Workflow,
  WorkflowAction,
  WorkflowExecution,
  WorkflowReaction,
} from "@area-common/types";
import { Document, model, Schema } from "mongoose";

export type WorkflowActionDocument = Document & WorkflowAction;

export type WorkflowExecutionDocument = Document & WorkflowExecution;

export type WorkflowReactionDocument = Document & WorkflowReaction;

export type WorkflowDocument = Document & Workflow;

const WorkflowActionSchema = new Schema<WorkflowActionDocument>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  serviceId: { type: String, required: true },
  actionId: { type: String, required: true },
  parameters: { type: Map, required: true },
});

const WorkflowExecutionSchema = new Schema<WorkflowExecutionDocument>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  functionId: { type: String, required: true },
  parameters: { type: Map, required: true },
});

const WorkflowReactionSchema = new Schema<WorkflowReactionDocument>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  serviceId: { type: String, required: true },
  reactionId: { type: String, required: true },
  parameters: { type: Map, required: true },
  condition: { type: String, required: true },
});

export const WorkflowSchema = new Schema<WorkflowDocument>({
  userId: { type: String, required: true },
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  actions: { type: [WorkflowActionSchema], required: true },
  reactions: { type: [WorkflowReactionSchema], required: true },
  executions: { type: [WorkflowExecutionSchema], required: true },
});

WorkflowSchema.index({ userId: 1, id: 1 }, { unique: true });

export const WorkflowModel = model("Workflow", WorkflowSchema);
