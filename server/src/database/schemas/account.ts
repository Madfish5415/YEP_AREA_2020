import { Account } from "@area-common/types";
import crypto from "crypto-js";
import { Document, model, Schema } from "mongoose";

export type AccountDocument = Document & {
  salt: string;
  comparePassword(password: string): boolean;
  compareVerification(verification: string): boolean;
} & Required<Account>;

export const AccountSchema = new Schema<AccountDocument>({
  userId: { type: String, required: true, unique: true },
  id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  verified: { type: Boolean, required: true, default: false },
  password: { type: String, required: true, select: false },
  salt: { type: String, required: true, select: false },
  verification: { type: String, required: true, select: false },
});

AccountSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  this.salt = crypto.lib.WordArray.random(16).toString();
  this.password = crypto.PBKDF2(this.password, this.salt).toString();
});

AccountSchema.methods.comparePassword = function (password: string) {
  return this.password === crypto.PBKDF2(password, this.salt).toString();
};

AccountSchema.methods.compareVerification = function (verification) {
  return this.verification === verification;
};

export const AccountModel = model("Account", AccountSchema);
