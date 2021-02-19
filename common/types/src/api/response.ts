import { AnyObject } from "../lib";
import { Status } from "../status";

type Data = {
  data: AnyObject | AnyObject[];
};

type Success = {
  success: Status;
};

type Failure = {
  failure: Status;
};

export type APIResponse = {
  status: number;
} & (Data | Success | Failure);
