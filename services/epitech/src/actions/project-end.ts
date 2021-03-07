import { IntervalNode, toQuery } from "@area-common/service";
import { Any, Type, Variable } from "@area-common/types";
import moment from "moment";
import fetch from "node-fetch";

import { Project } from "../models";

type Parameters = {
  endsIn: number;
};

type Credentials = {
  autologin: string;
};

export class ProjectEndNode extends IntervalNode<Parameters, Project> {
  readonly id: string = "epitech-project-end";
  readonly name: string = "Project End";
  readonly description: string = "No description";
  readonly label: string = "action";
  readonly parametersDef: Record<keyof Parameters, Variable> = {
    endsIn: {
      name: "Ends in",
      description: "No description",
      type: Type.NUMBER,
    },
  };
  readonly outputsDef: Record<keyof Project, Variable> = {
    id: {
      name: "Project ID",
      description: "No description",
      type: Type.STRING,
    },
    name: {
      name: "Project Name",
      description: "No description",
      type: Type.STRING,
    },
    begin: {
      name: "Project Begin",
      description: "No description",
      type: Type.STRING,
    },
    end: {
      name: "Project End",
      description: "No description",
      type: Type.STRING,
    },
    scholarYear: {
      name: "Project Scholar Year",
      description: "No description",
      type: Type.STRING,
    },
    moduleId: {
      name: "Project Module ID",
      description: "No description",
      type: Type.STRING,
    },
    locationId: {
      name: "Project Location ID",
      description: "No description",
      type: Type.STRING,
    },
  };
  readonly interval: number = 10 * 1000;
  readonly credentials: boolean = true;

  private allReturnedProjects = new Map<Parameters, Map<string, boolean>>();

  async execute(parameters: Parameters & Credentials): Promise<Project[]> {
    const { endsIn, autologin } = parameters;
    const now = Date.now();
    const end = moment(new Date(now + endsIn * 1000));
    const query = toQuery({
      format: "json",
    });
    const url = `${autologin}/?${query}`;

    const response = await fetch(url, {
      method: "GET",
    });
    const json = await response.json();

    if (response.status >= 400) {
      console.warn(json);

      return [];
    }

    const returnedProjects =
      this.allReturnedProjects.get(parameters) || new Map<string, boolean>();

    const projects: Project[] = json.board.projects.map(
      (json: Any): Project => {
        const link = json.title_link.split("/");

        return {
          id: link[5],
          name: json.title,
          begin: json.timeline_start,
          end: json.timeline_end,
          scholarYear: link[2],
          moduleId: link[3],
          locationId: link[4],
        };
      }
    );

    const filteredProjects = projects.filter((project) => {
      if (returnedProjects.has(project.id)) {
        return false;
      }

      const date = moment(project.end, "YYYY-MM-DD, hh:mm");

      if (date < end) {
        return false;
      }

      returnedProjects.set(project.id, true);

      return true;
    });

    return filteredProjects;
  }
}
