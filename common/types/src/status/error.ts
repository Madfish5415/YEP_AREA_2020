import { Status } from "./status";

export class StatusError implements Status, Error {
  code: number;
  name: string;
  message: string;

  constructor(code: number, status: Status) {
    this.code = code;
    this.name = status.name;
    this.message = status.message;
  }
}
