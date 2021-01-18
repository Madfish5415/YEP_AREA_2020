import { Core } from "./core/core";
import { HOSTNAME, PORT } from "./constants/environment";

async function main() {
  const core = new Core(HOSTNAME, PORT);

  process.on("SIGINT", () => core.stop());
  process.on("SIGTERM", () => core.stop());

  await core.start();

  console.info(
    `ready - started server on http://${core.hostname}:${core.port}`
  );
}

main().catch((err) => console.error(err));
