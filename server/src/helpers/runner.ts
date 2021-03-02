import { AnyObject } from "@area-common/types";

const expressionRegex = /\${(.+?)}/g;

export function runnerMergeParameters(
  parameters: AnyObject,
  userParameters: Record<string, string>
): AnyObject {
  return Object.entries(userParameters).reduce(
    (previous: AnyObject, [key, value]) => {
      const matchesArr = value.matchAll(expressionRegex);

      for (const matches of matchesArr) {
        value = value.replace(matches[0], parameters[matches[1]] as string);
      }

      return {
        ...previous,
        [key]: value,
      };
    },
    {}
  );
}
