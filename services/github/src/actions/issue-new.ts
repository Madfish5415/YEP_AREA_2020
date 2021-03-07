import { IntervalNode, toQuery } from "@area-common/service";
import { Any, AnyObject, Type, Variable } from "@area-common/types";
import fetch from "node-fetch";

import { Issue } from "../models";

type Parameters = {
  owner: string;
  repository: string;
};

type Credentials = {
  accessToken: string;
};

export class IssueNewNode extends IntervalNode<Parameters, Issue> {
  readonly id: string = "github-issue-new";
  readonly name: string = "Issue New";
  readonly description: string = "No description";
  readonly label: string = "action";
  readonly parametersDef: Record<keyof Parameters, Variable> = {
    owner: {
      name: "Owner",
      description: "No description",
      type: Type.STRING,
    },
    repository: {
      name: "Repository",
      description: "No description",
      type: Type.STRING,
    },
  };
  readonly outputsDef: Record<keyof Issue, Variable> = {
    id: {
      name: "Issue ID",
      description: "No description",
      type: Type.STRING,
    },
    title: {
      name: "Issue Title",
      description: "No description",
      type: Type.STRING,
    },
    body: {
      name: "Issue Body",
      description: "No description",
      type: Type.STRING,
    },
  };
  readonly interval: number = 10 * 1000;
  readonly credentials: boolean = true;

  private lastDates = new Map<AnyObject, number>();

  async execute(
    parameters: Parameters & Credentials
  ): Promise<Issue | Issue[]> {
    const { owner, repository, accessToken } = parameters;

    const query = toQuery({
      per_page: 10,
    });
    const url = `https://api.github.com/repos/${owner}/${repository}/issues?${query}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const json = await response.json();

    if (response.status >= 400) {
      console.warn(json);

      return [];
    }

    const lastDate = this.lastDates.get(parameters) || Date.now();

    this.lastDates.set(parameters, Date.now());

    const filteredIssuesJson = json.filter((json: Any) => {
      const date = Date.parse(json.created_at);

      return date > lastDate && !json.pull_request;
    });

    if (!filteredIssuesJson.length) {
      return [];
    }

    const issues: Issue[] = filteredIssuesJson.map(
      (json: Any): Issue => {
        return {
          id: json.id,
          title: json.title,
          body: json.body,
        };
      }
    );

    return issues;
  }
}
