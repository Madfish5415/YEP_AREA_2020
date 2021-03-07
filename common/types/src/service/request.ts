import { Request } from "../http";
import { User } from "../user";

export type ServiceRequest = Request & {
    user: User;
};

export type ServiceActionRequest = ServiceRequest & {
    instance: string;
};