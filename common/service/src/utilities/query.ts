import { AnyObject } from "@area-common/types";

export function toQuery(object: AnyObject): string {
  return Object.entries(object)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
}
