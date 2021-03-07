import { BaseNode } from "@area-common/service";
import { Type, Variable } from "@area-common/types";

import { GMAIL_CLIENT, OAUTH2_CLIENT } from "../constants";

type Parameters = {
  receiver: string;
  title: string;
  body: string;
};

type Credentials = {
  accessToken: string;
};

const mailCreateRaw = (to: string, subject: string, body: string) => {
  const str = [
    'Content-Type: text/plain; charset="UTF-8"\n',
    "MIME-Version: 1.0\n",
    "Content-Transfer-Encoding: 7bit\n",
    `to: ${to}\n`,
    `subject: ${subject}\n\n`,
    body,
  ].join("");

  return new Buffer(str)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

export class MailSendNode extends BaseNode<Parameters, void> {
  readonly id: string = "gmail-mail-send";
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

    OAUTH2_CLIENT.setCredentials({ access_token: accessToken });

    await GMAIL_CLIENT.users.messages.send({
      userId: "me",
      requestBody: {
        raw: mailCreateRaw(receiver, title, body),
      },
    });
  }
}
