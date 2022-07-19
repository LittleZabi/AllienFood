import express from "express";
import User from "../models/userModels.js";
import users from "../users.js";
import expressAsyncHandler from "express-async-handler";
const userRouter = express.Router();

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const createdUsers = await User.insertMany(users);
    res.send({ createdUsers });
  })
);
export default userRouter;
