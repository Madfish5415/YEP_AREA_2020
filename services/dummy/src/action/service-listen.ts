import { ServiceAction } from "./service";
import { ServiceListenRunner } from "../runner";

export class ServiceListenAction extends ServiceAction {
  runner = ServiceListenRunner;
}
