import { User } from "@area-common/types";
import { Document, model, Schema } from "mongoose";

export type UserDocument = Document & User;

export const UserSchema = new Schema({
  id: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  administrator: { type: Boolean, required: true },
});

export const UserModel = model<UserDocument>("User", UserSchema);
