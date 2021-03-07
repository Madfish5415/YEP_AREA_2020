import { IntervalNode, toQuery } from "@area-common/service";
import { Any, AnyObject, Type, Variable } from "@area-common/types";
import fetch from "node-fetch";

import { Notification } from "../models";

type Credentials = {
  accessToken: string;
};

export class NotificationNewNode extends IntervalNode<AnyObject, Notification> {
  readonly id: string = "github-notification-new";
  readonly name: string = "Notification New";
  readonly description: string = "No description";
  readonly label: string = "action";
  readonly parametersDef = undefined;
  readonly outputsDef: Record<keyof Notification, Variable> = {
    id: {
      name: "Notification ID",
      description: "No description",
      type: Type.STRING,
    },
    repositoryId: {
      name: "Notification Repository ID",
      description: "No description",
      type: Type.STRING,
    },
    title: {
      name: "Notification Title",
      description: "No description",
      type: Type.STRING,
    },
    type: {
      name: "Notification Type",
      description: "No description",
      type: Type.STRING,
    },
  };
  readonly interval: number = 10 * 1000;
  readonly credentials: boolean = true;

  private lastDates = new Map<AnyObject, number>();

  async execute(
    parameters: Credentials
  ): Promise<Notification | Notification[]> {
    const { accessToken } = parameters;

    const query = toQuery({
      per_page: 10,
    });
    const url = `https://api.github.com/notifications?${query}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const json = await response.json();

    const lastDate = this.lastDates.get(parameters) || Date.now();

    this.lastDates.set(parameters, Date.now());

    const filteredNotificationsJson = json.filter((json: Any) => {
      const date = Date.parse(json.updated_at);

      return date > lastDate;
    });

    if (!filteredNotificationsJson.length) {
      return [];
    }

    const notifications: Notification[] = filteredNotificationsJson.map(
      (json: Any): Notification => {
        return {
          id: json.id,
          repositoryId: json.repository.id,
          title: json.subject.title,
          type: json.subject.type,
        };
      }
    );

    return notifications;
  }
}
