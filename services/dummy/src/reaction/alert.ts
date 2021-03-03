import { BaseReaction } from "@area-common/service";
import { Type, Variable } from "@area-common/types";
import fetch from "node-fetch";

export class AlertReaction extends BaseReaction {
  readonly id = "alert";
  readonly name = "Alert";
  readonly description = "Send an alert";
  readonly parameters: Variable[] = [
    {
      id: "message",
      name: "Message",
      description: "Content of the alert message",
      type: Type.STRING,
    },
  ];

  async send(parameters: Record<string, unknown>): Promise<void> {
    console.log(parameters);

    await fetch(`http://localhost:12345/alert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: parameters.message,
      }),
    });
  }
}
