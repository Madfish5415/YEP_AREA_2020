import {BaseRunner} from "./runner";

export abstract class ListenRunner extends BaseRunner {
  abstract listen(request: any): Promise<any>;
}
