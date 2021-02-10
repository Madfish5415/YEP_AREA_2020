import { Core } from "./core/core";
import { HOSTNAME, PORT, REMOTE_URL } from "./constants/environment";

async function main() {
  const core = new Core(HOSTNAME, PORT, REMOTE_URL);

  process.on("SIGINT", () => {
    core.stopRemote();
    core.stop();
  });
  process.on("SIGTERM", () => {
    core.stopRemote();
    core.stop();
  });

  await core.start();

  core.startRemote();

  console.info(
    `ready - started server on http://${core.hostname}:${core.port}`
  );
}

main().catch((err) => console.error(err));
