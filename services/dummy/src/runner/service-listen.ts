import { ListenRunner } from "@area-common/service";

export class ServiceListenRunner extends ListenRunner {
  async listen(request: Request): Promise<any> {
    return request.body;
  }
}
