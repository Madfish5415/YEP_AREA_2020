import { Response } from "../http";

export type ServiceResponse = Response & {
    code: number;
};

export type ServiceActionResponse = ServiceResponse;