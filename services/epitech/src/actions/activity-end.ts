import { IntervalNode, toQuery } from "@area-common/service";
import { Any, Type, Variable } from "@area-common/types";
import moment from "moment";
import fetch from "node-fetch";

import { Activity } from "../models";

type Parameters = {
  endsIn: number;
};

type Credentials = {
  autologin: string;
};

export class ActivityEndNode extends IntervalNode<Parameters, Activity> {
  readonly id: string = "epitech-activity-end";
  readonly name: string = "Activity End";
  readonly description: string = "No description";
  readonly label: string = "action";
  readonly parametersDef: Record<keyof Parameters, Variable> = {
    endsIn: {
      name: "Ends in",
      description: "No description",
      type: Type.NUMBER,
    },
  };
  readonly outputsDef: Record<keyof Activity, Variable> = {
    id: {
      name: "Activity ID",
      description: "No description",
      type: Type.STRING,
    },
    name: {
      name: "Activity Name",
      description: "No description",
      type: Type.STRING,
    },
    begin: {
      name: "Activity Begin",
      description: "No description",
      type: Type.STRING,
    },
    end: {
      name: "Activity End",
      description: "No description",
      type: Type.STRING,
    },
    scholarYear: {
      name: "Activity Scholar Year",
      description: "No description",
      type: Type.STRING,
    },
    moduleId: {
      name: "Activity Module ID",
      description: "No description",
      type: Type.STRING,
    },
    locationId: {
      name: "Activity Location ID",
      description: "No description",
      type: Type.STRING,
    },
  };
  readonly interval: number = 10 * 1000;
  readonly credentials: boolean = true;

  private allReturnedActivities = new Map<Parameters, Map<string, boolean>>();

  async execute(parameters: Parameters & Credentials): Promise<Activity[]> {
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
    const returnedActivities =
      this.allReturnedActivities.get(parameters) || new Map<string, boolean>();

    const activities: Activity[] = json.board.activities.map(
      (json: Any): Activity => {
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

    const filteredActivities = activities.filter((activity) => {
      if (returnedActivities.has(activity.id)) {
        return false;
      }

      const date = moment(activity.end, "YYYY-MM-DD, hh:mm");

      if (date < end) {
        return false;
      }

      returnedActivities.set(activity.id, true);

      return true;
    });

    return filteredActivities;
  }
}
