import {BaseService} from "@area-common/service";
import {ActivityEndNode, ModuleEndNode, ProjectEndNode} from "./actions";
import {ActivityRegisterNode, ModuleRegisterNode} from "./reactions";

export class EpitechService extends BaseService {
  readonly id: string = "epitech";
  readonly name: string = "Epitech";
  readonly version: string = "1.0.0";
  readonly description: string = "Epitech service for AREA";
  readonly nodes = [
    new ActivityEndNode(),
    new ModuleEndNode(),
    new ProjectEndNode(),
    new ActivityRegisterNode(),
    new ModuleRegisterNode()
  ];
}
