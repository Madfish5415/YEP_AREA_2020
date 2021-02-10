import { randomChoice } from "../utilities/random";
import { services } from "../constants/services";
import fetch from "node-fetch";

export async function remote(url: string): Promise<void> {
  const service = randomChoice(services());

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      data: service,
    }),
  });
}
