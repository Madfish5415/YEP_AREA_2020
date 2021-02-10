import express, { Express, json } from "express";
import cors from "cors";
import { Server } from "http";
import { indexRouter } from "../routes";
import { remote } from "../remote/remote";

export class Core {
  hostname: string;
  port: number;
  remoteUrl: string;

  express: Express;
  server?: Server;

  interval?: number;

  constructor(hostname: string, port: number, remoteUrl: string) {
    this.hostname = hostname;
    this.port = port;
    this.remoteUrl = remoteUrl;

    this.express = express();

    this.express.use(cors());
    this.express.use(json());
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

  startRemote(): void {
    this.interval = setInterval(async () => {
      await remote(this.remoteUrl);
    }, 5000);
  }

  stopRemote(): void {
    clearInterval(this.interval);
  }
}
