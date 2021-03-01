import { Node, Service } from "@area-common/types";

export abstract class BaseService implements Service {
  abstract readonly id: string;
  abstract readonly name: string;
  abstract readonly description: string;
  abstract readonly version: string;
  abstract readonly nodes: Node[];
}
