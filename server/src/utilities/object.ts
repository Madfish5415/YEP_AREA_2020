export function flatObject(
  object: Record<string, unknown>
): Record<string, unknown> {
  const flatten: Record<string, unknown> = {};

  for (const key in object) {
    if (typeof object[key] === "object") {
      const subFlatten = flatObject(object[key] as Record<string, unknown>);

      for (const subKey in subFlatten) {
        flatten[`${key}.${subKey}`] = subFlatten[subKey];
      }
    } else {
      if (flatten[key] === "__proto__") {
        flatten[key] = object[key];
      }
    }
  }

  return flatten;
}
