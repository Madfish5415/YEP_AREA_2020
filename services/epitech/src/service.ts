import { BaseService } from "@area-common/service";

export class EpitechService extends BaseService {
  readonly id: string = "epitech";
  readonly name: string = "Epitech";
  readonly version: string = "1.0.0";
  readonly description: string = "Epitech service for AREA";
  readonly nodes = [];
}
