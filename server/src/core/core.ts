import express, { Express, json } from "express";
import cors from "cors";
import { Server } from "http";
import { indexRouter } from "../routes";
import { Operator, Service, Workflow } from "@area-common/types";
import { OperatorRepository } from "../repositories/operator";
import { ServiceRepository } from "../repositories/service";
import { WorkflowRepository } from "../repositories/workflow";
import { operatorRepository } from "../middlewares/operatorRepository";
import { serviceRepository } from "../middlewares/serviceRepository";
import { workflowRepository } from "../middlewares/workflowRepository";

export class Core {
  hostname: string;
  port: number;

  operatorRepository: OperatorRepository;
  serviceRepository: ServiceRepository;
  workflowRepository: WorkflowRepository;

  express: Express;
  server?: Server;

  constructor(
    hostname: string,
    port: number,
    operators: Operator[],
    services: Service[]
  ) {
    this.hostname = hostname;
    this.port = port;

    this.operatorRepository = new OperatorRepository(operators);
    this.serviceRepository = new ServiceRepository(services);
    this.workflowRepository = new WorkflowRepository(
      this.operatorRepository,
      this.serviceRepository
    );

    this.express = express();

    this.express.use(cors());
    this.express.use(json());
    this.express.use(operatorRepository(this.operatorRepository));
    this.express.use(serviceRepository(this.serviceRepository));
    this.express.use(workflowRepository(this.workflowRepository));
    this.express.use(indexRouter);
  }

  start(): Promise<void> {
    this.workflowRepository
      .list()
      .forEach((workflow: Workflow) => workflow.runner?.start());

    return new Promise<void>((resolve) => {
      this.server = this.express.listen(this.port, this.hostname, () => {
        return resolve();
      });
    });
  }

  stop(): Promise<void> {
    this.workflowRepository
      .list()
      .forEach((workflow: Workflow) => workflow.runner?.stop());

    return new Promise<void>((resolve, reject) => {
      this.server?.close((err) => {
        return err ? reject(err) : resolve();
      });
    });
  }
}
