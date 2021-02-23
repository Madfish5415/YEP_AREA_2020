import { User } from "@area-common/types";
import { Document, model, Schema } from "mongoose";

export type UserDocument = Document & User;

export const UserSchema = new Schema({
  id: { type: String, required: true, unique: true },
  email: { type: String },
  firstName: { type: String },
  lastName: { type: String },
});

export const UserModel = model<UserDocument>("User", UserSchema);
