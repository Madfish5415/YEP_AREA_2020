import { AnyObject } from "@area-common/types";

export function hasMissingKeys<T>(
  object: AnyObject,
  keys: (keyof T)[]
): (keyof T)[] {
  const missingKeys: (keyof T)[] = [];

  for (const key of keys) {
    if (!(key in object)) {
      missingKeys.push(key);
    }
  }

  return missingKeys;
}
