import { AnyObject } from "@area-common/types";

export function missingKeysOf<T extends AnyObject>(
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

export function hasAKeysOf<T extends AnyObject>(
  object: AnyObject,
  keys: (keyof T)[]
): [boolean, (keyof T)[]] {
  const missingKeys = missingKeysOf<T>(object, keys);

  return [missingKeys.length !== keys.length, missingKeys];
}

export function hasAllKeysOf<T extends AnyObject>(
  object: AnyObject,
  keys: (keyof T)[]
): [boolean, (keyof T)[]] {
  const missingKeys = missingKeysOf<T>(object, keys);

  return [!missingKeys.length, missingKeys];
}
