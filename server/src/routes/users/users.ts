import users from "../../data/users.json";

import { Router } from "express";
import { userRouter } from "./[id]/user";

const usersRoute = "/users";

export const usersRouter = Router();

usersRouter.use(usersRoute, userRouter);

usersRouter.get(usersRoute, (req, res) => {
  return res.json({ data: users });
});
