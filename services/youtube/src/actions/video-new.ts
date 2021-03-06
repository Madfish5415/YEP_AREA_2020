import { IntervalNode, toQuery } from "@area-common/service";
import { Any, Type, Variable } from "@area-common/types";
import fetch from "node-fetch";

import { Video } from "../models";

type Parameters = {
  id: string;
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
    id: {
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
    const { id, accessToken } = parameters;

    const channelQuery = toQuery({
      id: id,
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

    const playlistVideos = playlistItemsJson.items.map((json: Any) => {
      return json.contentDetails;
    });
    const filteredPlaylistVideos = playlistVideos.filter(
      (playlistItem: Any) => {
        const date = Date.parse(playlistItem.videoPublishedAt);

        return date > lastDate;
      }
    );

    const ids = filteredPlaylistVideos
      .map((playlistItem: Any) => `id=${playlistItem.videoId}`)
      .join("&");
    const videosQuery = toQuery({
      part: "snippet",
    });
    const videosUrl = `https://youtube.googleapis.com/youtube/v3/videos?${videosQuery}&${ids}`;

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
          id: id,
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
