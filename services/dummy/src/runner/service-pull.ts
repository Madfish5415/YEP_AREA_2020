import { PullRunner } from "@area-common/service";
import fetch from "node-fetch";

export class ServicePullRunner extends PullRunner {
  interval = 5000;

  async pull(): Promise<any> {
    const response = await fetch(`http://localhost:12345/services/${this.parameters?.id}`);

    return await response.json()
  }
}
