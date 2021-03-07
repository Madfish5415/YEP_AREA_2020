import { IntervalNode } from "@area-common/service";
import { Any, AnyObject, Type, Variable } from "@area-common/types";
import fetch from "node-fetch";

import { Mail } from "../models";

type Credentials = {
  accessToken: string;
};

export class MailNewNode extends IntervalNode<AnyObject, Mail> {
  readonly id: string = "outlook-mail-new";
  readonly name: string = "Mail New";
  readonly description: string = "No description";
  readonly label: string = "action";
  readonly parametersDef = undefined;
  readonly outputsDef: Record<keyof Mail, Variable> = {
    id: {
      name: "Mail ID",
      description: "No description",
      type: Type.STRING,
    },
    sender: {
      name: "Mail Sender",
      description: "No description",
      type: Type.STRING,
    },
    title: {
      name: "Mail Title",
      description: "No description",
      type: Type.STRING,
    },
    body: {
      name: "Mail Body",
      description: "No description",
      type: Type.STRING,
    },
  };
  readonly interval: number = 10 * 1000;
  readonly credentials: boolean = true;

  private lastDates = new Map<AnyObject, number>();

  async execute(parameters: Credentials): Promise<Mail | Mail[]> {
    const { accessToken } = parameters;

    const url = `https://outlook.office.com/api/v2.0/me/messages`;

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

    const filteredMailsJson = json.value.filter((json: Any) => {
      const date = Date.parse(json.SentDateTime);

      return date > lastDate && json.Sender;
    });

    if (!filteredMailsJson.length) {
      return [];
    }

    const mails: Mail[] = filteredMailsJson.map(
      (json: Any): Mail => {
        return {
          id: json.Id,
          sender: json.Sender.EmailAddress.Address,
          title: json.Subject,
          body: json.Body.Content,
        };
      }
    );

    return mails;
  }
}
