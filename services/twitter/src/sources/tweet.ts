import { PoolingSource, toQuery } from "@area-common/service";
import { CLIENT } from "../constants";
import { Any, Event, EventType } from "@area-common/types";

type Parameters = {
  username: string;
  token: string;
  tokenSecret: string;
};

export class TweetSource extends PoolingSource<Parameters> {
  eventIds = ["tweet"];
  interval = 5 * 60 * 60 * 1000;

  private lastDate = Date.now();

  async pool(eventType: EventType<Parameters>): Promise<Event<Parameters>[]> {
    const { username, token, tokenSecret } = eventType.parameters;
    const query = toQuery({
      screen_name: username,
      count: 10,
    });
    const url = `https://api.twitter.com/1.1/statuses/user_timeline.json?${query}`;
    const authorization = CLIENT.authHeader(url, token, tokenSecret, "GET");

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: authorization,
      },
    });
    const json = await response.json();
    const lastDate = this.lastDate;

    this.lastDate = Date.now();

    const tweets = json.filter((tweet: Any) => {
      const date = Date.parse(tweet.date);

      return date > lastDate;
    });

    return tweets.map((tweet: Any) => {
      return {
        type: eventType,
        data: tweet,
      };
    });
  }
}
