import {Router} from "express";

const alertRoute = "/alert";

export const alertRouter = Router();

alertRouter.post(alertRoute, (req, res) => {
  console.log(req.body);

  return res.sendStatus(200);
});
