import express, { Express } from "express";
import cors from "cors";
import { Server } from "http";
import { indexRouter } from "../routes";
import {sleepMiddleware} from "../_development/middlewares";

export class Core {
  hostname: string;
  port: number;

  express: Express;
  server?: Server;

  constructor(hostname: string, port: number) {
    this.hostname = hostname;
    this.port = port;

    this.express = express();

    this.express.use(sleepMiddleware(1000));

    this.express.use(cors());
    this.express.use(indexRouter);
  }

  start(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.server = this.express.listen(this.port, this.hostname, () => {
        return resolve();
      });
    });
  }

  stop(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.server?.close((err) => {
        return err ? reject(err) : resolve();
      });
    });
  }
}
