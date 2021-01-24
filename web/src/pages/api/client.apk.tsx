import fs from "fs";
import {NextApiRequest, NextApiResponse} from "next";

export default function clientApk(req: NextApiRequest, res: NextApiResponse) {
  if (!process.env.CLIENT_APK_PATH || !fs.existsSync(process.env.CLIENT_APK_PATH)) {
    return res.status(404).end();
  }

  const file = fs.readFileSync(process.env.CLIENT_APK_PATH);

  return res.send(file);
}
