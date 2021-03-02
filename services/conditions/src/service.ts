import { BaseService } from "@area-common/service";

import { ContainsNode, EqualNode, NotNode } from "./nodes";

export class ConditionsService extends BaseService {
  readonly id: string = "conditions";
  readonly name: string = "Conditions";
  readonly version: string = "1.0.0";
  readonly description: string = "Conditions service for AREA";
  readonly nodes = [new ContainsNode(), new EqualNode(), new NotNode()];
}
