import { Any, Service } from "@area-common/types";

import { BaseNode } from "../node";

export abstract class BaseService implements Service {
  abstract readonly id: string;
  abstract readonly name: string;
  abstract readonly description: string;
  abstract readonly version: string;
  abstract readonly nodes: BaseNode[];

  toJSON(): Any {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      version: this.version,
      nodes: this.nodes,
    };
  }
}
