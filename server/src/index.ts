import { Core } from "./core/core";
import { HOSTNAME, PORT } from "./constants/environment";
import { DummyService } from "@area-service/dummy";
import { Operator, Service } from "@area-common/types";
import { EqualOperator } from "./operators/equal";
import { NotOperator } from "./operators/not";
import { ContainsOperator } from "./operators/contains";
import { AndOperator } from "./operators/and";
import { OrOperator } from "./operators/or";

async function main() {
  const operators: Operator[] = [
    new AndOperator(),
    new ContainsOperator(),
    new EqualOperator(),
    new NotOperator(),
    new OrOperator(),
  ];
  const services: Service[] = [new DummyService()];
  const core = new Core(HOSTNAME, PORT, operators, services);

  process.on("SIGINT", () => core.stop());
  process.on("SIGTERM", () => core.stop());

  await core.start();

  console.info(
    `ready - started server on http://${core.hostname}:${core.port}`
  );
}

main().catch((err) => console.error(err));
