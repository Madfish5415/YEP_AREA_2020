import { Credential } from "@area-common/types";
import crypto, { AES } from "crypto-js";
import { Document, model, Schema } from "mongoose";

import { AES_SECRET } from "../../constants";

export type CredentialDocument = Document & Credential;

export const CredentialSchema = new Schema<CredentialDocument>({
  userId: { type: String, required: true },
  serviceId: { type: String, required: true },
  value: { type: String, required: true },
});

CredentialSchema.index({ userId: 1, serviceId: 1 }, { unique: true });

CredentialSchema.pre("save", function (next) {
  if (!this.isModified("value")) return next();

  this.value = AES.encrypt(this.value, AES_SECRET).toString();

  return next();
});

CredentialSchema.post("init", function () {
  this.value = AES.decrypt(this.value, AES_SECRET).toString(crypto.enc.Utf8);
});

export const CredentialModel = model("Credential", CredentialSchema);
