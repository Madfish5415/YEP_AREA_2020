import { AnyObject } from "@area-common/types";

export function toQuery(object: AnyObject): string {
  return Object.entries(object)
    .map(([value, key]) => `${key}=${value}`)
    .join("&");
}
