import { Pair } from "../utilities";

export type ServiceSetting = Pair<string, string> & {
    username: string;
    secure?: boolean;
};