import { IntervalNode, toQuery } from "@area-common/service";
import { Any, Type, Variable } from "@area-common/types";
import moment from "moment";
import fetch from "node-fetch";

import { Module } from "../models";

type Parameters = {
  endsIn: number;
};

type Credentials = {
  autologin: string;
};

export class ModuleEndNode extends IntervalNode<Parameters, Module> {
  readonly id: string = "epitech-module-end";
  readonly name: string = "Module End";
  readonly description: string = "From Epitech";
  readonly label: string = "action";
  readonly parametersDef: Record<keyof Parameters, Variable> = {
    endsIn: {
      name: "Ends in",
      description: "No description",
      type: Type.NUMBER,
    },
  };
  readonly outputsDef: Record<keyof Module, Variable> = {
    id: {
      name: "Module ID",
      description: "No description",
      type: Type.STRING,
    },
    name: {
      name: "Module Name",
      description: "No description",
      type: Type.STRING,
    },
    begin: {
      name: "Module Begin",
      description: "No description",
      type: Type.STRING,
    },
    end: {
      name: "Module End",
      description: "No description",
      type: Type.STRING,
    },
    scholarYear: {
      name: "Module Scholar Year",
      description: "No description",
      type: Type.STRING,
    },
    locationId: {
      name: "Module Location ID",
      description: "No description",
      type: Type.STRING,
    },
  };
  readonly interval: number = 10 * 1000;
  readonly credentials: boolean = true;

  private allReturnedModules = new Map<Parameters, Map<string, boolean>>();

  async execute(parameters: Parameters & Credentials): Promise<Module[]> {
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

    const returnedModules =
      this.allReturnedModules.get(parameters) || new Map<string, boolean>();

    const modules: Module[] = json.board.modules.map(
      (json: Any): Module => {
        const link = json.title_link.split("/");

        return {
          id: link[3],
          name: json.title,
          begin: json.timeline_start,
          end: json.timeline_end,
          scholarYear: link[2],
          locationId: link[4],
        };
      }
    );

    const filteredModules = modules.filter((module) => {
      if (returnedModules.has(module.id)) {
        return false;
      }

      const date = moment(module.end, "YYYY-MM-DD, hh:mm");

      if (date < end) {
        return false;
      }

      returnedModules.set(module.id, true);

      return true;
    });

    return filteredModules;
  }
}
