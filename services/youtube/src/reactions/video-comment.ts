import { BaseNode, toQuery } from "@area-common/service";
import { Type, Variable } from "@area-common/types";
import fetch from "node-fetch";

type Parameters = {
  channelId: string;
  videoId: string;
  text: string;
};

type Credentials = {
  accessToken: string;
};

export class VideoCommentNode extends BaseNode<Parameters, void> {
  readonly id: string = "youtube-video-comment";
  readonly name: string = "Video Comment";
  readonly description: string = "No description";
  readonly label: string = "reaction";
  readonly parametersDef: Record<keyof Parameters, Variable> = {
    channelId: {
      name: "Channel ID",
      description: "No description",
      type: Type.STRING,
    },
    videoId: {
      name: "Video ID",
      description: "No description",
      type: Type.STRING,
    },
    text: {
      name: "Comment text",
      description: "No description",
      type: Type.STRING,
    },
  };
  readonly outputsDef = undefined;
  readonly credentials: boolean = true;

  async execute(parameters: Parameters & Credentials): Promise<void> {
    const { channelId, videoId, text, accessToken } = parameters;
    const query = toQuery({
      part: "snippet",
    });
    const url = `https://youtube.googleapis.com/youtube/v3/commentThreads?${query}`;
    const body = JSON.stringify({
      snippet: {
        channelId: channelId,
        videoId: videoId,
        topLevelComment: {
          snippet: {
            textOriginal: text,
          },
        },
      },
    });

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body,
    });
    const json = await response;

    console.log(json);
  }
}
