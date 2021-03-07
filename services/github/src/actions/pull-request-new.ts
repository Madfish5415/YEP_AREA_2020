import { IntervalNode, toQuery } from "@area-common/service";
import { Any, AnyObject, Type, Variable } from "@area-common/types";
import fetch from "node-fetch";

import { PullRequest } from "../models";

type Parameters = {
  owner: string;
  repository: string;
};

type Credentials = {
  accessToken: string;
};

export class PullRequestNewNode extends IntervalNode<Parameters, PullRequest> {
  readonly id: string = "github-pull-request-new";
  readonly name: string = "Pull Request New";
  readonly description: string = "From GitHub";
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
  readonly outputsDef: Record<keyof PullRequest, Variable> = {
    id: {
      name: "Pull Request ID",
      description: "No description",
      type: Type.STRING,
    },
    title: {
      name: "Pull Request Title",
      description: "No description",
      type: Type.STRING,
    },
    body: {
      name: "Pull Request Body",
      description: "No description",
      type: Type.STRING,
    },
  };
  readonly interval: number = 10 * 1000;
  readonly credentials: boolean = true;

  private lastDates = new Map<AnyObject, number>();

  async execute(
    parameters: Parameters & Credentials
  ): Promise<PullRequest | PullRequest[]> {
    const { owner, repository, accessToken } = parameters;

    const query = toQuery({
      per_page: 10,
    });
    const url = `https://api.github.com/repos/${owner}/${repository}/pullRequests?${query}`;

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

    const filteredPullRequestsJson = json.filter((json: Any) => {
      const date = Date.parse(json.created_at);

      return date > lastDate && json.pull_request;
    });

    if (!filteredPullRequestsJson.length) {
      return [];
    }

    const pullRequests: PullRequest[] = filteredPullRequestsJson.map(
      (json: Any): PullRequest => {
        return {
          id: json.id,
          title: json.title,
          body: json.body,
        };
      }
    );

    return pullRequests;
  }
}
