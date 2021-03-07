import { IntervalNode } from "@area-common/service";
import { AnyObject, Type, Variable } from "@area-common/types";

import { GMAIL_CLIENT, OAUTH2_CLIENT } from "../constants";
import { Mail } from "../models";

type Credentials = {
  accessToken: string;
};

export class MailNewNode extends IntervalNode<AnyObject, Mail> {
  readonly id: string = "gmail-mail-new";
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

    OAUTH2_CLIENT.setCredentials({ access_token: accessToken });

    const mailsListAPI = await GMAIL_CLIENT.users.messages.list({
      userId: "me",
    });

    const lastDate = this.lastDates.get(parameters) || Date.now();

    this.lastDates.set(parameters, Date.now());

    if (mailsListAPI.status >= 400) {
      console.warn(mailsListAPI.statusText);

      return [];
    }

    if (!mailsListAPI.data.resultSizeEstimate!) return [];

    const mailsAPI = await Promise.all(
      mailsListAPI.data.messages!.map(async (mailListAPI) => {
        return await GMAIL_CLIENT.users.messages.get({
          userId: "me",
          id: mailListAPI.id!,
        });
      })
    );

    const filteredMailsAPI = mailsAPI.filter((mailAPI) => {
      const date = parseInt(mailAPI.data.internalDate!);

      return date > lastDate;
    });

    if (!filteredMailsAPI?.length) {
      return [];
    }

    const mails: Mail[] = filteredMailsAPI.map(
      (mailAPI): Mail => {
        const encodedBody = mailAPI.data.payload!.parts!.find(
          (part) => part.partId! === "0"
        )!.body!.data!;
        const body = Buffer.from(encodedBody, "base64").toString();

        return {
          id: mailAPI.data.id!,
          sender: mailAPI.data.payload!.headers!.find(
            (header) => header.name === "From"
          )!.value!,
          title: mailAPI.data.payload!.headers!.find(
            (header) => header.name === "Subject"
          )!.value!,
          body: body,
        };
      }
    );

    return mails;
  }
}
