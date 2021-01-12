import users from "../../../../data/users.json";

import { Router } from "express";

const userRoute = "/:id";

export const userRouter = Router();

userRouter.get(userRoute, (req, res) => {
  const user = users.find((user) => {
    return user.id === req.params.id;
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.json({ data: user });
});
