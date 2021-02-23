import { Execution, Service } from "@area-common/types";

import {
  DATABASE_HOSTNAME,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USER,
  HOSTNAME,
  PORT,
} from "./constants";
import { Core } from "./core/core";
import { Database } from "./database";

async function main() {
  const database = new Database({
    hostname: DATABASE_HOSTNAME,
    port: DATABASE_PORT,
    name: DATABASE_NAME,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
  });
  const executions: Execution[] = [];
  const services: Service[] = [];
  const core = new Core(HOSTNAME, PORT, database, executions, services);

  process.on("SIGINT", () => core.stop());
  process.on("SIGTERM", () => core.stop());

  await core.start();

  console.info(
    `ready - started server on http://${core.hostname}:${core.port}`
  );
}

main().catch((err) => console.error(err));
