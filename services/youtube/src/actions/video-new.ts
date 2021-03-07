import { IntervalNode, toQuery } from "@area-common/service";
import { Any, Type, Variable } from "@area-common/types";
import fetch from "node-fetch";

import { Video } from "../models";

type Parameters = {
  channelId: string;
};

type Credentials = {
  accessToken: string;
};

export class VideoNewNode extends IntervalNode<Parameters, Video> {
  readonly id: string = "video-new";
  readonly name: string = "Video New";
  readonly description: string = "No description";
  readonly label: string = "action";
  readonly parametersDef: Record<keyof Parameters, Variable> = {
    channelId: {
      name: "Channel ID",
      description: "No description",
      type: Type.STRING,
    },
  };
  readonly outputsDef: Record<keyof Video, Variable> = {
    id: {
      name: "Video ID",
      description: "No description",
      type: Type.STRING,
    },
    channelId: {
      name: "Channel ID",
      description: "No description",
      type: Type.STRING,
    },
    title: {
      name: "Video title",
      description: "No description",
      type: Type.STRING,
    },
    description: {
      name: "Video description",
      description: "No description",
      type: Type.STRING,
    },
    views: {
      name: "Video views",
      description: "No description",
      type: Type.STRING,
    },
    likes: {
      name: "Video likes",
      description: "No description",
      type: Type.STRING,
    },
    dislikes: {
      name: "Video dislikes",
      description: "No description",
      type: Type.STRING,
    },
    comments: {
      name: "Video comments",
      description: "No description",
      type: Type.STRING,
    },
  };
  readonly interval: number = 10 * 1000;
  readonly credentials: boolean = true;

  private lastDates = new Map<Parameters, number>();

  async execute(
    parameters: Parameters & Credentials
  ): Promise<Video | Video[]> {
    const { channelId, accessToken } = parameters;

    const channelQuery = toQuery({
      id: channelId,
      part: "contentDetails",
    });
    const channelUrl = `https://youtube.googleapis.com/youtube/v3/channels?${channelQuery}`;

    const channelResponse = await fetch(channelUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const channelJson = await channelResponse.json();

    const playlistItemsQuery = toQuery({
      playlistId: channelJson.items[0].contentDetails.relatedPlaylists.uploads,
      part: "contentDetails",
    });
    const playlistItemsUrl = `https://youtube.googleapis.com/youtube/v3/playlistItems?${playlistItemsQuery}`;

    const playlistItemsResponse = await fetch(playlistItemsUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const playlistItemsJson = await playlistItemsResponse.json();

    const lastDate = this.lastDates.get(parameters) || Date.now();

    this.lastDates.set(parameters, Date.now());

    const playlistVideosJson = playlistItemsJson.items.map((json: Any) => {
      return json.contentDetails;
    });
    const filteredPlaylistVideosJson = playlistVideosJson.filter(
      (json: Any) => {
        const date = Date.parse(json.videoPublishedAt);

        return date > lastDate;
      }
    );

    if (!filteredPlaylistVideosJson.length) {
      return [];
    }

    const parts = ["snippet", "statistics"]
      .map((part) => `part=${part}`)
      .join("&");
    const ids = filteredPlaylistVideosJson
      .map((json: Any) => `id=${json.videoId}`)
      .join("&");
    const videosUrl = `https://youtube.googleapis.com/youtube/v3/videos?${parts}&${ids}`;

    const videosResponse = await fetch(videosUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const videosJson = await videosResponse.json();

    const videos: Video[] = videosJson.items.map(
      (json: Any): Video => {
        return {
          id: channelId,
          channelId: "",
          title: json.snippet.title,
          description: json.snippet.description,
          views: json.statistics.viewCount,
          likes: json.statistics.likeCount,
          dislikes: json.statistics.dislikeCount,
          comments: json.statistics.commentCount,
        };
      }
    );

    return videos;
  }
}
