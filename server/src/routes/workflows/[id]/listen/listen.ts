import { Router } from "express";
import {ListenRunner} from "@area-common/service";

const listenRoute = "/listen";

export const listenRouter = Router();

listenRouter.post(listenRoute, async (req, res) => {
  if (!(req.workflow.runner instanceof ListenRunner)) {
    return res.sendStatus(404);
  }

  if (req.workflow.runner.running) {
    const outputs = await req.workflow.runner.listen(req);

    req.workflow.runner.callback(outputs);
  }

  return res.sendStatus(200);
});
