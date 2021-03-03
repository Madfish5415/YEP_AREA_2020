import { ServiceAction } from "./service";
import { ServicePullRunner } from "../runner";

export class ServicePullAction extends ServiceAction {
  runner = ServicePullRunner;
}
