import mongoose from "mongoose";
import { Mongoose } from "mongoose";

export type DatabaseConfiguration = {
  readonly hostname: string;
  readonly port: number;
  readonly name?: string;
  readonly user?: string;
  readonly password?: string;
};

export class Database {
  readonly hostname: string;
  readonly port: number;
  readonly name?: string;
  private readonly user?: string;
  private readonly password?: string;

  private mongoose?: Mongoose;

  constructor(configuration: DatabaseConfiguration) {
    this.hostname = configuration.hostname;
    this.port = configuration.port;
    this.name = configuration.name;
    this.user = configuration.user;
    this.password = configuration.password;
  }

  async connect(): Promise<void> {
    const host = `mongodb://${this.hostname}:${this.port}`;

    this.mongoose = await mongoose.connect(host, {
      dbName: this.name,
      user: this.user,
      pass: this.password,

      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  async disconnect(): Promise<void> {
    await this.mongoose?.disconnect();
  }
}
