import { Execution, Service } from "@area-common/types";
import cors from "cors";
import express, { Express, json } from "express";
import { Server } from "http";

import { Database } from "../database";
import { RunnerManager } from "../managers";
import { runnerMiddleware, workflowMiddleware } from "../middlewares";
import {
  AccountRepository,
  ExecutionRepository,
  ServiceRepository,
  UserRepository,
  WorkflowRepository,
} from "../repositories";
import { apiRouter } from "../routes";
import { useStrategies } from "../strategies";

export class Core {
  hostname: string;
  port: number;

  database: Database;
  accountRepository: AccountRepository;
  userRepository: UserRepository;
  workflowRepository: WorkflowRepository;

  executionRepository: ExecutionRepository;
  serviceRepository: ServiceRepository;

  runnerManager: RunnerManager;

  express: Express;
  server?: Server;

  constructor(
    hostname: string,
    port: number,
    database: Database,
    executions: Execution[],
    services: Service[]
  ) {
    this.hostname = hostname;
    this.port = port;

    this.database = database;
    this.accountRepository = new AccountRepository();
    this.userRepository = new UserRepository();
    this.workflowRepository = new WorkflowRepository();

    this.executionRepository = new ExecutionRepository(executions);
    this.serviceRepository = new ServiceRepository(services);

    this.runnerManager = new RunnerManager(
      this.executionRepository,
      this.serviceRepository,
      this.workflowRepository
    );

    this.express = express();

    useStrategies(this.accountRepository, this.userRepository);

    this.express.use(cors());
    this.express.use(json());
    this.express.use(workflowMiddleware(this.workflowRepository));
    this.express.use(runnerMiddleware(this.runnerManager));
    this.express.use(apiRouter);
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
