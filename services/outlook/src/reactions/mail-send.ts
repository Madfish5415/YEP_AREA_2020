import { BaseNode } from "@area-common/service";
import { Type, Variable } from "@area-common/types";
import fetch from "node-fetch";

type Parameters = {
  receiver: string;
  title: string;
  body: string;
};

type Credentials = {
  accessToken: string;
};

export class MailSendNode extends BaseNode<Parameters, void> {
  readonly id: string = "outlook-mail-send";
  readonly name: string = "Mail Send";
  readonly description: string = "No description";
  readonly label: string = "reaction";
  readonly parametersDef: Record<keyof Parameters, Variable> = {
    receiver: {
      name: "Mail Receiver",
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
  readonly outputsDef = undefined;
  readonly credentials: boolean = true;

  async execute(parameters: Parameters & Credentials): Promise<void> {
    const { receiver, title, body, accessToken } = parameters;

    const url = `https://outlook.office.com/api/v2.0/me/sendmail`;
    const rBody = JSON.stringify({
      Message: {
        Subject: title,
        Body: {
          ContentType: "Text",
          Content: body,
        },
        ToRecipients: [
          {
            EmailAddress: {
              Address: receiver,
            },
          },
        ],
      },
    });

    await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: rBody,
    });
  }
}
