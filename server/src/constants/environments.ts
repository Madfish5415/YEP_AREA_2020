import { v4 } from "uuid";

export const HOSTNAME = process.env.HOSTNAME || "localhost";
export const PORT = parseInt(process.env.PORT || "8080");
export const DATABASE_HOSTNAME = process.env.DATABASE_HOSTNAME || "localhost";
export const DATABASE_PORT = parseInt(process.env.DATABASE_PORT || "27017");
export const DATABASE_NAME = process.env.DATABASE_NAME;
export const DATABASE_USER = process.env.DATABASE_USER;
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;

export const AES_SECRET = process.env.AES_SECRET || v4();
export const AUTHORIZE_SECRET = process.env.AUTHORIZE_SECRET || v4();
