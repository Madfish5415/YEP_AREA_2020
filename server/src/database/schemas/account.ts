import { Account } from "@area-common/types";
import bcrypt from "bcrypt";
import { Document, model, Schema } from "mongoose";

export type AccountDocument = Document & {
  comparePassword(password: string): boolean;
  compareVerification(verification: string): boolean;
} & Required<Account>;

export const AccountSchema = new Schema<AccountDocument>({
  userId: { type: String, required: true, unique: true },
  id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  verified: { type: Boolean, required: true, default: false },
  password: { type: String, required: true, select: false },
  verification: { type: String, required: true, select: false },
});

AccountSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));

  return next();
});

AccountSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compareSync(password, this.password);
};

AccountSchema.methods.compareVerification = function (verification) {
  return this.verification === verification;
};

export const AccountModel = model("Account", AccountSchema);
