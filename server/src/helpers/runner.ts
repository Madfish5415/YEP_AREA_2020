import { AnyObject } from "@area-common/types";

const expressionRegex = /\${(.+?)}/g;

export function runnerEvaluateExpression(
  parameters: AnyObject,
  expression: string
): string {
  const matchesArr = expression.matchAll(expressionRegex);

  for (const matches of matchesArr) {
    expression = expression.replace(
      matches[0],
      parameters[matches[1]] as string
    );
  }

  return expression;
}

export function runnerEvaluateExpressions(
  parameters: AnyObject,
  expressions: Record<string, string>
): AnyObject {
  return Object.entries(expressions).reduce(
    (previous: AnyObject, [key, value]) => {
      const expression = runnerEvaluateExpression(parameters, value);

      return {
        ...previous,
        [key]: expression,
      };
    },
    {}
  );
}
