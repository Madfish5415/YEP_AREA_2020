import { BaseService } from "@area-common/service";
import { ServiceListenAction } from "./action";
import { AlertReaction } from "./reaction";

export class DummyService extends BaseService {
  readonly id = "dummy";
  readonly name = "Dummy";
  readonly description = "Dummy service for AREA";
  readonly version = "1.0.0";
  readonly actions = [new ServiceListenAction()];
  readonly reactions = [new AlertReaction()];
}
