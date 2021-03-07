import { BaseNode, toQuery } from "@area-common/service";
import { Type, Variable } from "@area-common/types";
import fetch from "node-fetch";

type Parameters = {
  videoId: string;
  rating: string;
};

type Credentials = {
  accessToken: string;
};

export class VideoRateNode extends BaseNode<Parameters, void> {
  readonly id: string = "video-rate";
  readonly name: string = "Video Rate";
  readonly description: string = "No description";
  readonly label: string = "reaction";
  readonly parametersDef: Record<keyof Parameters, Variable> = {
    videoId: {
      name: "Video ID",
      description: "No description",
      type: Type.STRING,
    },
    rating: {
      name: "Rating",
      description: "No description",
      type: Type.STRING,
    },
  };
  readonly outputsDef = undefined;
  readonly credentials: boolean = true;

  async execute(parameters: Parameters & Credentials): Promise<void> {
    const { videoId, rating, accessToken } = parameters;
    const query = toQuery({
      id: videoId,
      rating: rating,
    });
    const url = `https://youtube.googleapis.com/youtube/v3/videos/rate?${query}`;

    await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}
