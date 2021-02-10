import {
  Callback,
  Runner,
  Workflow,
  WorkflowAction,
  WorkflowOperator,
  WorkflowReaction,
} from "@area-common/types";

const outputsRegex = /\${outputs.(.+?)}/;
const operatorsRegex = /\${operators.(.+?)}/;

declare global {
  interface String {
    matchAll(regexp: RegExp): RegExpExecArray[];
  }
}

String.prototype.matchAll = function (regexp: RegExp): RegExpExecArray[] {
  if (!regexp.global) return [];

  const allMatches: RegExpExecArray[] = [];
  let matches = regexp.exec(this.valueOf());

  while (matches !== null) {
    allMatches.push(matches);

    matches = regexp.exec(this.valueOf());
  }

  return allMatches;
};

function calculateOperatorsValues(
  operator: WorkflowOperator,
  operators: WorkflowOperator[],
  outputsValues: Record<string, unknown>,
  operatorsValues: Record<string, unknown>
): Record<string, unknown> {
  if (!operator.parameters) return operatorsValues;

  const parameters = { ...operator.parameters };

  for (const entry of Object.entries(parameters)) {
    const parameter = `${entry[1]}`;

    parameter.matchAll(outputsRegex);

    let matches = parameter.match(outputsRegex);

    if (matches && outputsValues[matches[1]]) {
      parameters[entry[0]] = parameter.replace(
        matches[0],
        `${outputsValues[matches[1]]}`
      );

      continue;
    }

    matches = parameter.match(operatorsRegex);

    if (matches) {
      if (operatorsValues[matches[1]] === undefined) {
        const operator = operators.find(
          (operator) => operator.id === matches?.[1]
        );

        if (operator) {
          calculateOperatorsValues(
            operator,
            operators,
            outputsValues,
            operatorsValues
          );
        }
      }

      if (operatorsValues[matches[1]] !== undefined) {
        parameters[entry[0]] = parameter.replace(
          matches[0],
          `${operatorsValues[matches[1]]}`
        );
      }
    }
  }

  if (operator.id !== "__proto__") {
    operatorsValues[operator.id] = operator.operator.verify(parameters);
  }

  return operatorsValues;
}

function executeReaction(
  reaction: WorkflowReaction,
  outputsValues: Record<string, unknown>
) {
  const parameters = { ...reaction.parameters };

  for (const entry of Object.entries(parameters)) {
    let parameter = `${entry[1]}`;
    const allMatches = parameter.matchAll(/\${outputs.(.+?)}/g);

    for (const matches of allMatches) {
      parameter = parameter.replace(matches[0], `${outputsValues[matches[1]]}`);
    }

    parameters[entry[0]] = parameter;
  }

  reaction.reaction.send(parameters);
}

export class BaseWorkflow implements Workflow {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly action: WorkflowAction;
  readonly reactions: WorkflowReaction[];
  readonly operators: WorkflowOperator[];
  readonly runner: Runner<Callback>;

  constructor(
    id: string,
    name: string,
    description: string,
    action: WorkflowAction,
    reactions: WorkflowReaction[],
    operators: WorkflowOperator[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.action = action;
    this.reactions = reactions;
    this.operators = operators;
    this.runner = new this.action.action.runner((response: any) =>
      this.run(response)
    );

    this.runner.parameters = this.action.parameters;
  }

  async run(response: any): Promise<void> {
    const outputsValues = await this.action.action.receive(response);
    let operatorsValues: Record<string, unknown> = {};

    this.reactions.forEach((reaction) => {
      if (reaction.operatorId) {
        const operator = this.operators.find(
          (operator) => operator.id === reaction.operatorId
        );

        if (operator) {
          operatorsValues = calculateOperatorsValues(
            operator,
            this.operators,
            outputsValues,
            operatorsValues
          );
        }
      }

      if (!reaction.operatorId || operatorsValues[reaction.operatorId]) {
        executeReaction(reaction, outputsValues);
      }
    });

    operatorsValues = {};
  }
}
