import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import { SERVER_URL } from "../../constants/environments";

export const config = {
  api: {
    bodyParser: false,
  },
};

function rawBody(req: NextApiRequest): Promise<string | undefined> {
  return new Promise((resolve, reject) => {
    let buffer: string;

    req.on("data", (chunk) => {
      buffer = buffer ? buffer + chunk : chunk;
    });

    req.on("error", (err) => {
      reject(err);
    });

    req.on("end", () => {
      resolve(buffer);
    });
  });
}

const apiMiddleware = nc<NextApiRequest, NextApiResponse>();

apiMiddleware.use(async (req, res, next) => {
  req.body = await rawBody(req);

  const url = `${SERVER_URL}${req.url}`;
  const init: RequestInit = {
    method: req.method,
    headers: req.headers as Record<string, string>,
    body: req.body,
  };

  const response = await fetch(url, init);

  for (const [key, value] of response.headers) {
    res.setHeader(key, value);
  }

  res.statusCode = response.status;
  res.statusMessage = response.statusText;

  const text = await response.text();

  return res.send(text);
});

export default apiMiddleware;
