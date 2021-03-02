import { Service } from "@area-common/types";
import cors from "cors";
import express, { Express, json } from "express";
import { Server } from "http";
import morgan from "morgan";
import passport from "passport";

import { Database } from "../database";
import { RunnerManager } from "../managers";
import {
  errorMiddleware,
  runnerMiddleware,
  workflowMiddleware,
} from "../middlewares";
import { serviceMiddleware } from "../middlewares/service";
import {
  AccountRepository,
  ServiceRepository,
  UserRepository,
  WorkflowRepository,
} from "../repositories";
import { CredentialRepository } from "../repositories/credential";
import { apiRouter } from "../routes";
import {
  usePartyStrategies,
  useServiceStrategies,
  useStrategies,
} from "../strategies";

export class Core {
  hostname: string;
  port: number;

  database: Database;
  accountRepository: AccountRepository;
  credentialRepository: CredentialRepository;
  userRepository: UserRepository;
  workflowRepository: WorkflowRepository;

  serviceRepository: ServiceRepository;

  runnerManager: RunnerManager;

  express: Express;
  server?: Server;

  constructor(
    hostname: string,
    port: number,
    database: Database,
    services: Service[]
  ) {
    this.hostname = hostname;
    this.port = port;

    this.database = database;
    this.accountRepository = new AccountRepository();
    this.credentialRepository = new CredentialRepository();
    this.userRepository = new UserRepository();
    this.workflowRepository = new WorkflowRepository();

    this.serviceRepository = new ServiceRepository(services);

    this.runnerManager = new RunnerManager(
      this.credentialRepository,
      this.serviceRepository,
      this.workflowRepository
    );

    this.express = express();

    useStrategies(this.accountRepository, this.userRepository);
    usePartyStrategies(this.userRepository);
    useServiceStrategies(this.serviceRepository, this.credentialRepository);

    this.express.use(cors());
    this.express.use(json());
    this.express.use(morgan("common"));
    this.express.use(passport.initialize());

    this.express.use(serviceMiddleware(this.serviceRepository));
    this.express.use(workflowMiddleware(this.workflowRepository));
    this.express.use(runnerMiddleware(this.runnerManager));

    this.express.use(apiRouter);

    this.express.use(errorMiddleware());
  }

  async start(): Promise<void> {
    await this.database.connect();
    await this.runnerManager.start();

    return new Promise<void>((resolve) => {
      this.server = this.express.listen(this.port, this.hostname, () => {
        return resolve();
      });
    });
  }

  async stop(): Promise<void> {
    await this.database.disconnect();
    await this.runnerManager.stop();

    return new Promise<void>((resolve, reject) => {
      this.server?.close((err) => {
        return err ? reject(err) : resolve();
      });
    });
  }
}
