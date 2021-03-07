import {Service} from "@area-common/types";
import {ConditionsService} from "@area-service/conditions";
import {EpitechService} from "@area-service/epitech";
import {GitHubService} from "@area-service/github";
import {GmailService} from "@area-service/gmail";
import {TwitterService} from "@area-service/twitter";
import {YammerService} from "@area-service/yammer";
import {YouTubeService} from "@area-service/youtube";
import {OutlookService} from "@area-service/outlook";

import {
  DATABASE_HOSTNAME,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USER,
  HOSTNAME,
  PORT,
} from "./constants";
import {Core} from "./core";
import {Database} from "./database";

async function main() {
  const database = new Database({
    hostname: DATABASE_HOSTNAME,
    port: DATABASE_PORT,
    name: DATABASE_NAME,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
  });
  const services: Service[] = [new ConditionsService(), new EpitechService(), new GitHubService(), new GmailService(), new OutlookService(), new TwitterService(), new YammerService(), new YouTubeService()];
  const core = new Core(HOSTNAME, PORT, database, services);

  process.on("SIGINT", () => core.stop());
  process.on("SIGTERM", () => core.stop());

  await core.start();

  console.info(
    `ready - started server on http://${core.hostname}:${core.port}`
  );
}

main().catch((err) => console.error(err));
